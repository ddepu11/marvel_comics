import { useState, useRef, useEffect } from 'react';
import validateForm from '../../../utils/validateForm';
import setValidationMessage from '../../../utils/setValidationMessage';
import clearAllSetTimeoutOrSetInterval from '../../../utils/clearAllSetTimeoutOrSetInterval';

const useSignUpLogic = () => {
  const [credentials, setCredentials] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const vmTags = {
    emailValidationMessageTag: useRef(),
    passwordValidationMessageTag: useRef(),
    confirmPasswordValidationMessageTag: useRef(),
    fullNameValidationMessageTag: useRef(),
  };

  const displayPictureValidationMessageTag = useRef();

  const lastSetTimeOutId = useRef();

  useEffect(() => {
    if (
      credentials.confirmPassword &&
      credentials.password === credentials.confirmPassword
    ) {
      setValidationMessage(
        'password matched',
        'success',
        lastSetTimeOutId,
        vmTags.confirmPasswordValidationMessageTag,
        4000
      );
    } else {
      vmTags.confirmPasswordValidationMessageTag.current.innerText = '';
    }

    return () => {
      clearAllSetTimeoutOrSetInterval(lastSetTimeOutId);
    };
  }, [
    lastSetTimeOutId,
    credentials.confirmPassword,
    credentials.password,
    vmTags.confirmPasswordValidationMessageTag,
  ]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const [displayPicture, setDisplayPicture] = useState({
    file: null,
    preview: '',
  });

  const handleDisplayPic = (e) => {
    const file = e.target.files[0];

    setDisplayPicture({ file, preview: URL.createObjectURL(file) });
  };

  const handleSubmit = () => {
    let error = validateForm(credentials, vmTags, lastSetTimeOutId, 'SIGN_UP');

    if (displayPicture.file === null) {
      error = true;
      setValidationMessage(
        'You must select display picture!',
        'error',
        lastSetTimeOutId,
        displayPictureValidationMessageTag
      );
    }

    if (!error) {
      console.log(credentials, displayPicture);
    }
  };

  return {
    handleSubmit,
    handleInput,
    credentials,
    vmTags,
    handleDisplayPic,
    displayPicture,
    displayPictureValidationMessageTag,
  };
};

export default useSignUpLogic;
