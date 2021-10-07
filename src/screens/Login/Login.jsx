import styled from 'styled-components';
import FormControl from '../../components/FormControl';

const Login = () => {
  console.log('Login');

  return (
    <Wrapper className='flex'>
      <form>
        <div className='row'>
          <FormControl
            label='Email'
            name='email'
            id='email'
            inputType='text'
            placeholder='enter you email address!'
            labelFs='1.1em'
            inputPadding='5px 10px'
            inputFs='1em'
          />
        </div>

        <div className='row'>
          <FormControl
            label='Password'
            name='password'
            id='password'
            inputType='password'
            placeholder='enter you password!'
            labelFs='1.1em'
            inputPadding='5px 10px'
            inputFs='1em'
            fcPadding=''
          />
        </div>

        
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 70vh;

  form {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    padding: 50px 50px;
  }
`;

export default Login;
