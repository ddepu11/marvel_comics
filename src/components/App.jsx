import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Navbar from '../screens/Navbar/Navbar';
import Home from '../screens/Home/Home';
import Movie from '../screens/Movie/Movie';
import Login from '../screens/Login/Login';
import { authInstance, firestoreInstance } from '../config/firebase';
import {
  storeUserInfo,
  userLoadingBegins,
  userLoadingEnds,
} from '../features/user';
import Loading from './Loading';
import useNotificationOps from './useNotificationOps';
import Signup from '../screens/Signup/Signup';
import {
  clearNotification,
  errorNofication,
  successNofication,
} from '../features/notification';

const App = () => {
  const dispatch = useDispatch();

  const { userLoading } = useSelector((state) => state.user.value);

  const { message, success, error } = useSelector(
    (state) => state.notification.value
  );

  const { showSuccessNotification, showErrorNotification } =
    useNotificationOps();

  // For showing notification
  useEffect(() => {
    if (message && success) {
      showSuccessNotification(message);
      dispatch(clearNotification());
    }

    if (message && error) {
      showErrorNotification(message);
      dispatch(clearNotification());
    }
  }, [
    message,
    success,
    error,
    showSuccessNotification,
    showErrorNotification,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(userLoadingBegins());

    const fetchUserData = async (email) => {
      const usersRef = collection(firestoreInstance, 'users');

      const q = query(usersRef, where('email', '==', email));

      try {
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          dispatch(successNofication(`Welcome back ${doc.get('fullName')}`));

          dispatch(storeUserInfo({ info: doc.data(), id: doc.id }));
        });
      } catch (err) {
        dispatch(errorNofication(err.code));
        dispatch(userLoadingEnds());
      }
    };

    onAuthStateChanged(authInstance, (user) => {
      if (user) {
        if (user.providerData[0].providerId !== 'password') {
          const userInfo = {
            displayName: user.displayName,
            email: user.email,
            dp: user.photoURL,
          };

          dispatch(successNofication(`Welcome back ${userInfo.displayName}`));

          dispatch(storeUserInfo({ info: userInfo, id: user.uid }));
        } else {
          fetchUserData(user.email);
        }
      } else {
        dispatch(userLoadingEnds());
      }
    });
  }, [dispatch]);

  if (userLoading) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />

      <Wrapper className='w-960'>
        <Router>
          <Navbar />

          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>

            <Route path='/login' exact>
              <Login />
            </Route>

            <Route path='/signup' exact>
              <Signup />
            </Route>

            <Route path='/movie/:id' exact>
              <Movie />
            </Route>
          </Switch>
        </Router>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.main`
  flex-direction: column;
  /* border: 1px solid #575757; */
`;

export default App;
