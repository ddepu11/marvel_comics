import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import { storeMovies } from '../../features/movies';
import useFetchData from '../../hooks/useFetchData';

const Home = () => {
  const dispatch = useDispatch();

  const { data, loading, fetchData } = useFetchData();
  // On Scroll load next page
  // &page=1

  const { movies, movieLoading, apiEndPoint, currentGenereId, genres } =
    useSelector((state) => state.movies.value);

  useEffect(() => {
    if (movies.length === 0) {
      fetchData(apiEndPoint);

      if (data) {
        dispatch(storeMovies(data));
      }
    }
  }, [data, fetchData, movies.length, apiEndPoint, dispatch]);

  if (loading || movieLoading) {
    return <Loading />;
  }

  let currentGenere = '';
  if (!loading && !movieLoading) {
    if (currentGenereId) {
      genres.forEach((item) => {
        if (item.id === +currentGenereId) {
          currentGenere = item.name;
        }
      });
    }
  }

  return (
    <Wrapper>
      {/* {movies.length !== 0 && console.log(movies)} */}

      <div className='heading'>
        {currentGenere !== ''
          ? `${currentGenere} genere movies:`
          : 'Popular movies:'}
      </div>

      <div className='movies '>
        {movies.length !== 0 &&
          movies.map((item) => (
            <Movie key={item.id}>
              <Link to={`/movie/${item.id}`}>
                <div className='image'>
                  <img
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                    alt={item.original_title}
                  />
                </div>

                <div className='cover'>
                  <h1 className='title'>{item.original_title}</h1>
                </div>

                <p className='rating'>{item.vote_average}</p>
              </Link>
            </Movie>
          ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  margin: 10px 0 30px;

  .heading {
    font-size: 1.5em;
    font-weight: 400;
    padding: 15px 0;
  }

  .movies {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, auto));
    gap: 30px 20px;
  }
`;

const Movie = styled.main`
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

  &:hover {
    cursor: pointer;
    transform: scale(1.1) translateY(-5px);
  }
`;

export default Home;
