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
      {/* {movies.length !== 0 && console.log(movies)} */}

      <div className='heading'>
        {currentGenere !== ''
          ? `${currentGenere} genere movies:`
          : 'Popular movies:'}
      </div>

      <div className='movies '>
        {movies.length !== 0 &&
          movies.map((item) => <Movie movie={item} key={item.id} />)}
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

export default Home;
