import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../screens/Navbar/Navbar';
import Comics from '../screens/Comics/Comics';
import Characters from '../screens/Characters/Characters';
import Events from '../screens/Events/Events';
import Series from '../screens/Series/Series';

const App = () => {
  console.log('App');

  return (
    <Wrapper className='w-960'>
      <Router>
        <Navbar />

        <Switch>
          <Route path='/comics' exact>
            <Comics />
          </Route>

          <Route path='/characters' exact>
            <Characters />
          </Route>

          <Route path='/events' exact>
            <Events />
          </Route>

          <Route path='/series' exact>
            <Series />
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
