import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useNavbarLogic from './Logic/useNavbarLogic';

const Navbar = () => {
  const {
    activeLink,
    handleActiveLink,
    genres,
    handleGenre,
    genreDropDown,
    handleKeyword,
    keyword,
  } = useNavbarLogic();

  return (
    <Wrapper className='flex'>
      <Link to='/' className='logo'>
        <span>The Movies</span>
      </Link>

      <div className='search'>
        <input
          type='text'
          value={keyword}
          placeholder='search movie'
          onChange={handleKeyword}
        />
      </div>

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
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  justify-content: space-between;
  padding: 10px 0;

  .logo {
    span {
      font-size: 2em;
      font-weight: 300;
    }
  }

  .search {
    input {
      font-size: 0.9em;
      padding: 4px 8px;
    }
  }

  .links {
    position: relative;
    li {
      margin-left: 5px;
      transition: all 0.4s ease;

      a,
      span {
        font-weight: 500;
        padding: 5px 10px;
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
