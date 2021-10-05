import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import useNavbarLogic from './Logic/useNavbarLogic';

const Navbar = () => {
  const { activeLink, handleActiveLink } = useNavbarLogic();

  return (
    <Wrapper className='flex'>
      <Link to='/' className='logo'>
        <img src={logo} alt='logo' />
      </Link>

      <ul className='links flex'>
        <li>
          <Link
            to='/'
            onClick={handleActiveLink}
            className={activeLink === '/' ? 'active' : ''}
          >
            Home
          </Link>
        </li>

        {/* <li>
          <Link
            to='/characters'
            onClick={handleActiveLink}
            className={activeLink === 'characters' ? 'active' : ''}
          >
            Characters
          </Link>
        </li>

        <li>
          <Link
            to='/events'
            onClick={handleActiveLink}
            className={activeLink === 'events' ? 'active' : ''}
          >
            Events
          </Link>
        </li>

        <li> 
          <Link
            to='/series'
            onClick={handleActiveLink}
            className={activeLink === 'series' ? 'active' : ''}
          >
            Series
          </Link>
        </li>
        */}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  justify-content: space-between;
  padding: 10px 0;

  .logo {
    width: 87px;
    height: 35px;

    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }

  .links {
    li {
      margin-left: 5px;
      transition: all 0.4s ease;

      a {
        font-weight: 500;
        padding: 5px 10px;
      }
    }

    a:hover {
      background-color: #fff;
      color: black;
      font-weight: 400;
      border-radius: 4px;
    }

    a.active {
      background-color: #fff;
      color: black;
      font-weight: 400;
      border-radius: 4px;
    }
  }
`;

export default Navbar;
