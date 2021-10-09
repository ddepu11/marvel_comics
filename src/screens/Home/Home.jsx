import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import { storeMovies } from '../../features/movies';
import useFetchData from '../../hooks/useFetchData';
import Movie from '../Movie/Movie';

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
      <div className='heading'>
        {currentGenere !== ''
          ? `${currentGenere} genere movies:`
          : 'Popular movies:'}
      </div>

      {movies.length !== 0 ? (
        <div className='movies '>
          {movies.map((item) => (
            <Movie movie={item} key={item.id} />
          ))}
        </div>
      ) : (
        <h1 className='no_movies'>Sorry there are no movies to show!</h1>
      )}
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
    grid-template-columns: repeat(auto-fit, minmax(225px, auto));
    gap: 30px 20px;
  }

  .no_movies {
    text-align: center;
    margin-top: 100px;
    font-weight: 400;
    font-size: 1.2em;
  }
`;

export default Home;
