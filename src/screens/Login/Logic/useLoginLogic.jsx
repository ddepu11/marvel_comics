import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TwitterAuthProvider, signInWithPopup } from 'firebase/auth';
import { authInstance } from '../../../config/firebase';
import { userLoadingBegins } from '../../../features/user';

const useLoginLogic = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { userLoggedIn } = useSelector((state) => state.user.value);

  useEffect(() => {
    if (userLoggedIn) {
      history.push('/');
    }
  }, [history, userLoggedIn]);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
  };

  const handleLoginViaTwitter = () => {
    dispatch(userLoadingBegins());

    // userLoadingBegins, storeUserInfo
    const provider = new TwitterAuthProvider();

    signInWithPopup(authInstance, provider)
      .then((result) => {
        const { user } = result;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    handleInput,
    credentials,
    handleSubmit,
    handleLoginViaTwitter,
  };
};

export default useLoginLogic;
