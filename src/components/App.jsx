import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import Navbar from '../screens/Navbar/Navbar';
import Home from '../screens/Home/Home';
import Movie from '../screens/Movie/Movie';
import Login from '../screens/Login/Login';
import { authInstance } from '../config/firebase';
import { storeUserInfo, userLoadingEnds } from '../features/user';
import Loading from './Loading';

const App = () => {
  const dispatch = useDispatch();
  const { userLoading } = useSelector((state) => state.user.value);

  useEffect(() => {
    onAuthStateChanged(authInstance, (user) => {
      if (user) {
        // const uid = user.uid;
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          dp: user.photoURL,
        };

        dispatch(storeUserInfo({ info: userInfo, id: user.uid }));
      } else {
        dispatch(userLoadingEnds());
      }
    });
  }, [dispatch]);

  if (userLoading) {
    return <Loading />;
  }

  return (
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

          <Route path='/movie/:id' exact>
            <Movie />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  flex-direction: column;
  /* border: 1px solid #575757; */
`;

export default App;
