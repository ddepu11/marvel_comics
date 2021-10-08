import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  TwitterAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { authInstance, firestoreInstance } from '../../../config/firebase';

import { userLoadingBegins, userLoadingEnds } from '../../../features/user';
import { errorNofication } from '../../../features/notification';
import validateForm from '../../../utils/validateForm';

const useLoginLogic = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const { userLoggedIn } = useSelector((state) => state.user.value);
  const lastTimeOutId = useRef(0);

  useEffect(() => {
    if (userLoggedIn) {
      history.push('/');
    }
  }, [history, userLoggedIn]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const emailValidationMessageTag = useRef(null);
  const passwordValidationMessageTag = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validateForm(
      credentials,
      {
        emailValidationMessageTag,
        passwordValidationMessageTag,
      },
      lastTimeOutId,
      'SIGN_IN'
    );

    if (!error) {
      signInWithEmailAndPassword(
        authInstance,
        credentials.email,
        credentials.password
      )
        .then(() => {})
        .catch((err) => {
          dispatch(errorNofication(err.code));
        });
    }
  };

  const saveUserInfoinFirestore = async (info) => {
    try {
      await addDoc(collection(firestoreInstance, 'users'), info);
    } catch (err) {
      dispatch(errorNofication(err.code));
      dispatch(userLoadingEnds());
    }
  };

  const checkIfUserInfoSaved = async (userInfo) => {
    try {
      const q = query(
        collection(firestoreInstance, 'users'),
        where('email', '==', userInfo.email)
      );

      const usersSnapshot = await getDocs(q);

      if (usersSnapshot.size === 0) {
        saveUserInfoinFirestore(userInfo);
      }
    } catch (err) {
      dispatch(errorNofication(err.code));
      dispatch(userLoadingEnds());
    }
  };

  const handleLoginViaTwitter = () => {
    dispatch(userLoadingBegins());

    const provider = new TwitterAuthProvider();

    signInWithPopup(authInstance, provider)
      .then(({ user }) => {
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          dp: user.photoURL,
        };

        checkIfUserInfoSaved(userInfo);
      })
      .catch((err) => {
        dispatch(errorNofication(err.code));
        dispatch(userLoadingEnds());
      });
  };

  return {
    handleInput,
    credentials,
    handleSubmit,
    handleLoginViaTwitter,
    emailValidationMessageTag,
    passwordValidationMessageTag,
  };
};

export default useLoginLogic;
