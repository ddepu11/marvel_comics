import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useNavbarLogic from './Logic/useNavbarLogic';
import Button from '../../components/Button';

const Navbar = () => {
  const {
    activeLink,
    handleActiveLink,
    genres,
    handleGenre,
    genreDropDown,
    handleKeyword,
    keyword,
    handleClickOnLogo,
    userLoggedIn,
    handleLogOut,
    info,
  } = useNavbarLogic();

  return (
    <Wrapper className='flex'>
      <Link to='/' className='logo' onClick={handleClickOnLogo}>
        <span>Movies DB</span>
      </Link>

      <div className='search'>
        <input
          type='text'
          value={keyword}
          placeholder='search movie'
          onChange={handleKeyword}
        />
      </div>

      {userLoggedIn && (
        <div className='flex'>
          <div className='user_dp'>
            <img
              src={typeof info.dp === 'string' ? info.dp : info.dp.url}
              alt=''
            />
          </div>

          <div className='display_name'>
            {info.displayName ? info.displayName : info.fullName}
          </div>
        </div>
      )}

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

        {userLoggedIn && (
          <>
            <li>
              <Link
                to='/liked-movies'
                onClick={handleActiveLink}
                className={activeLink === 'liked-movies' ? 'active' : ''}
              >
                liked Movies
              </Link>
            </li>

            <li>
              <Link
                to='/watch-later'
                onClick={handleActiveLink}
                className={activeLink === 'watch-later' ? 'active' : ''}
              >
                Watch later
              </Link>
            </li>
          </>
        )}

        {!userLoggedIn && (
          <li>
            <Link
              to='/login'
              onClick={handleActiveLink}
              className={activeLink === 'login' ? 'active' : ''}
            >
              Login
            </Link>
          </li>
        )}

        {!userLoggedIn && (
          <li>
            <Link
              to='/signup'
              onClick={handleActiveLink}
              className={activeLink === 'signup' ? 'active' : ''}
            >
              Signup
            </Link>
          </li>
        )}

        <li
          className='genere'
          onClick={() => genreDropDown.current.classList.add('show')}
        >
          <span className='GEN'>Genere</span>
        </li>

        <div className='genere_dropdown flex' ref={genreDropDown}>
          {genres.length !== 0 &&
            genres.map((item) => (
              <span key={item.id} data-id={item.id} onClick={handleGenre}>
                {item.name}
              </span>
            ))}
        </div>

        {userLoggedIn && (
          <li>
            <Button
              type='submit'
              fs='0.9em'
              width='100%'
              padding='4px 8px'
              margin='0 0 0 5px'
              borderRadius='5px'
              bgColor='#eb4343'
              color='#fffbfb'
              transform=''
              fWeight='500'
              handleClick={handleLogOut}
            >
              Logout
            </Button>
          </li>
        )}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  justify-content: space-between;
  padding: 10px 0;

  .logo {
    span {
      font-size: 1.5em;
      font-weight: 300;
    }
  }

  .search {
    input {
      font-size: 0.8em;
      padding: 4px 8px;
      border-radius: 8px;
    }
  }

  .user_dp {
    width: 30px;
    height: 30px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .display_name {
    margin-left: 10px;
    font-weight: 500;
    color: #ffffff;
    font-size: 0.95em;
  }

  .links {
    position: relative;

    li {
      margin-left: 4px;
      transition: all 0.4s ease;

      a,
      span {
        font-weight: 500;
        padding: 4px 8px;
        font-size: 0.9em;
      }
    }

    a:hover,
    span:hover {
      background-color: #fff;
      color: black;
      font-weight: 400;
      border-radius: 4px;
      cursor: pointer;
    }

    a.active {
      background-color: #fff;
      color: black;
      font-weight: 400;
      border-radius: 4px;
    }
  }

  .genere_dropdown {
    position: absolute;
    top: 120%;
    z-index: 2;
    background: #2da8ce;
    width: 200px;
    height: 300px;
    padding: 10px 15px;
    border-radius: 10px;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: scroll;
    opacity: 0;
    pointer-events: none;

    span {
      width: 100%;
      padding: 5px;
    }
  }

  .genere_dropdown.show {
    opacity: 0.95;
    pointer-events: all;
  }
`;

export default Navbar;
