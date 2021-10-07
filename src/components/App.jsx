import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from '../screens/Navbar/Navbar';
import Home from '../screens/Home/Home';
import Movie from '../screens/Movie/Movie';
import Login from '../screens/Login/Login';

const App = () => {
  console.log('App');

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
