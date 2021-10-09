import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
// import { storeMovies } from '../../features/movies';
import { errorNofication } from '../../features/notification';
import Loading from '../../components/Loading';
import Movie from '../Movie/Movie';

const Home = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const { movieLoading, apiEndPoint, currentGenereId, genres } = useSelector(
    (state) => state.movies.value
  );

  useEffect(() => {
    let mounted = true;

    // if (currentGenereId && page > 1) {
    //   console.log('Genere');
    //   setMovies([]);
    //   setPage(1);
    // }

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${apiEndPoint}&page=${page}`);
        const { results } = await response.json();

        if (mounted) {
          setMovies((prevMovies) => [...prevMovies, ...results]);
          setLoading(false);
        }
      } catch (err) {
        dispatch(errorNofication(err.code));
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [apiEndPoint, dispatch, page, currentGenereId]);

  // The innerHeight property returns the height of a window's content area.
  // The scrollHeight property returns the entire height of an element in pixels, including padding, but not the       border, scrollbar or margin.
  // The read-only scrollY property of the Window interface returns the number of pixels that the document is currently scrolled vertically.

  useEffect(() => {
    let mounted = true;

    const scrollEvent = window.addEventListener('scroll', () => {
      const ineerHeightPlusScrollY = window.innerHeight + window.scrollY;

      if (
        !loading &&
        ineerHeightPlusScrollY >= document.body.scrollHeight - 100
      ) {
        if (mounted) {
          setLoading(true);
          setPage((prevPage) => prevPage + 1);
        }
      }
    });

    return () => {
      mounted = false;
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [apiEndPoint, loading]);

  if (movieLoading) {
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
            <Movie
              movie={item}
              key={Math.floor(Math.random() * item.id * Date.now())}
            />
          ))}
        </div>
      ) : (
        <h1 className='no_movies'>Sorry there are no movies to show!</h1>
      )}

      {loading && <Loading size='20vh' />}
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
