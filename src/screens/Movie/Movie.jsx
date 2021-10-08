import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import PropTypes from 'prop-types';

const Movie = ({ movie }) => {
  const { info, userLoggedIn } = useSelector((state) => state.user.value);

  const dislikeMovie = (e) => {
    e.preventDefault();

    console.log('Dislike');
  };

  const likeMovie = (e) => {
    e.preventDefault();

    console.log('like', movie.id);
  };

  return (
    <Wrapper>
      <Link to={`/movie/${movie.id}`}>
        <div className='image'>
          <img
            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
            alt={movie.original_title}
          />
        </div>

        <div className='cover'>
          <h1 className='title'>{movie.original_title}</h1>
        </div>

        <p className='rating'>{movie.vote_average}</p>

        {userLoggedIn && (
          <div className='like_or_dislike flex'>
            {info.likedMovies.includes(movie.id) ? (
              <FcLikePlaceholder fontSize='1.3em' onClick={dislikeMovie} />
            ) : (
              <FcLike fontSize='1.3em' onClick={likeMovie} />
            )}
          </div>
        )}
      </Link>
    </Wrapper>
  );
};

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
};

const Wrapper = styled.main`
  position: relative;
  transition: transform 0.5s ease;
  border-radius: 10px;
  overflow: hidden;

  .image {
    height: calc(200px * 1.5);
    width: 232px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .cover {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;

    .title {
      position: absolute;
      width: 100%;
      bottom: 0;
      background-color: #fff;
      font-size: 0.9em;
      font-weight: 400;
      color: #000;
      text-align: center;
      padding: 8px 0;
    }
  }

  .rating {
    font-size: 0.9em;
    position: absolute;
    top: 5px;
    left: 5px;
    background: rgba(0, 0, 0, 0.8);
    display: grid;
    place-content: center;
    padding: 7px;
    border-radius: 50%;
  }

  .like_or_dislike {
    position: absolute;
    top: 8px;
    right: 5px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.9);
    padding: 7px;
  }

  :hover {
    cursor: pointer;
    transform: scale(1.04) translateY(-5px);
  }
`;

export default Movie;
