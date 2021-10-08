import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import FormControl from '../../components/FormControl';
import useSignUpLogic from './Logic/useSignUpLogic';

const Signup = () => {
  const { handleSubmit, handleInput, credentials, vmTags } = useSignUpLogic();

  return (
    <Wrapper className='flex'>
      <div className='center_box'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <FormControl
              label='Full name'
              name='fullName'
              id='fullName'
              inputType='text'
              placeholder='enter you full name!'
              labelFs='1.1em'
              inputPadding='5px 10px'
              inputFs='0.9em'
              inputColor='#333'
              handleInput={handleInput}
              inputValue={credentials.fullName}
              refObj={vmTags.fullNameValidationMessageTag}
              messageFs='0.9em'
            />
          </div>

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
              refObj={vmTags.emailValidationMessageTag}
              messageFs='0.9em'
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
              handleInput={handleInput}
              inputValue={credentials.password}
              refObj={vmTags.passwordValidationMessageTag}
              messageFs='0.9em'
            />
          </div>

          <div className='row'>
            <FormControl
              label='Confirm assword'
              name='confirmPassword'
              id='confirmPassword'
              inputType='password'
              placeholder='enter you password again'
              labelFs='1.1em'
              inputPadding='5px 10px'
              inputFs='0.9em'
              inputColor='#333'
              handleInput={handleInput}
              inputValue={credentials.confirmPassword}
              refObj={vmTags.confirmPasswordValidationMessageTag}
              messageFs='0.9em'
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
            Signup
          </Button>
        </form>

        {/* <div className='or_row flex'>
          <div className='left' />
          <span>OR</span>
          <div className='right' />
        </div> */}

        {/* <Button
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
        </Button> */}
      </div>

      <div className='sign_up flex'>
        <span>Have an account ?</span>

        <Link to='/login'>Login</Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  flex-direction: column;
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

  padd .btn_center {
    span {
      margin-left: 10px;
    }
  }

  .sign_up {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    margin-top: 15px;
    padding: 10px 27px;

    span {
      margin-right: 15px;
    }

    a {
      color: #0be441;
    }
  }
`;

export default Signup;
