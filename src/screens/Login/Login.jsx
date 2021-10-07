import styled from 'styled-components';
import { BsTwitter } from 'react-icons/bs';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';
import useLoginLogic from './Logic/useLoginLogic';

const Login = () => {
  const { handleInput, credentials, handleSubmit, handleLoginViaTwitter } =
    useLoginLogic();

  return (
    <Wrapper className='flex'>
      <div className='center_box'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <FormControl
              label='Email'
              name='email'
              id='email'
              inputType='text'
              placeholder='enter you email address!'
              labelFs='1.1em'
              inputColor='#333'
              inputPadding='5px 10px'
              inputFs='0.9em'
              handleInput={handleInput}
              inputValue={credentials.email}
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
              inputFs='0.9em'
              inputColor='#333'
              fcPadding=''
              handleInput={handleInput}
              inputValue={credentials.password}
            />
          </div>

          <Button
            type='submit'
            fs='0.9em'
            width='100%'
            margin='25px 0 0 0'
            padding='5px 0px'
            borderRadius='5px'
            bgColor='#d8d6d6'
            color='#000'
            transform=''
          >
            Login
          </Button>
        </form>

        <div className='or_row flex'>
          <div className='left' />
          <span>OR</span>
          <div className='right' />
        </div>

        <Button
          type='submit'
          fs='0.9em'
          width='100%'
          margin='15px 0 0 0'
          padding='5px 0px'
          borderRadius='5px'
          bgColor='#d8d6d6'
          color='#000'
          transform=''
          handleClick={handleLoginViaTwitter}
        >
          <div className='btn_center flex'>
            <BsTwitter color='#156d96fa' />
            <span>Login via twitter</span>
          </div>
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 70vh;

  .center_box {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    padding: 20px 50px;
  }

  .or_row {
    justify-content: space-between;
    margin: 20px 0 0px;

    .left,
    .right {
      width: 40%;
      height: 1px;
      background: #fdfdfd;
      border-radius: 10px;
    }
  }

  .btn_center {
    span {
      margin-left: 10px;
    }
  }
`;

export default Login;
