import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  TwitterAuthProvider,
  signInWithPopup,
  // signInWithEmailAndPassword,
} from 'firebase/auth';
import { authInstance } from '../../../config/firebase';
import { userLoadingBegins, userLoadingEnds } from '../../../features/user';
import { successNofication } from '../../../features/notification';
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
      console.log(error);
    }
  };

  const handleLoginViaTwitter = () => {
    dispatch(userLoadingBegins());

    // userLoadingBegins, storeUserInfo
    const provider = new TwitterAuthProvider();

    signInWithPopup(authInstance, provider)
      .then(() => {})
      .catch((err) => {
        console.log(err);
        dispatch(successNofication(err.code));
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
