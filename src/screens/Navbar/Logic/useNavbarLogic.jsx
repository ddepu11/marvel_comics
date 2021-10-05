import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  moviesError,
  moviesLoadingBegins,
  setApiEndPointAndGenere,
  storeGenres,
  storeMovies,
} from '../../../features/movies';

const useNavbarLogic = () => {
  const [activeLink, setActiveLink] = useState('/');

  const handleActiveLink = (e) => {
    if (e.target.getAttribute('href') === '/') {
      setActiveLink('/');
    } else {
      const link = e.target.getAttribute('href').slice(1);
      setActiveLink(link);
    }
  };

  const dispatch = useDispatch();
  const apiKey = process.env.TMDB_API_KEY;

  const apiEndPoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

  const { genres } = useSelector((state) => state.movies.value);
  const mounted = useRef(true);
  const genreDropDown = useRef(null);

  useEffect(() => {
    const fetchGeneres = async () => {
      try {
        const response = await fetch(apiEndPoint);

        const data = await response.json();

        if (mounted.current) {
          dispatch(storeGenres(data.genres));
        }
      } catch (err) {
        dispatch(moviesError());
      }
    };

    if (genres.length === 0) {
      fetchGeneres();
    }

    return () => {
      mounted.current = false;
    };
  }, [apiEndPoint, dispatch, genres]);

  useEffect(() => {
    const clickListenerFunc = (e) => {
      if (!e.target.matches('.GEN')) {
        genreDropDown.current.classList.remove('show');
      }
    };

    document.body.addEventListener('click', clickListenerFunc);

    return () => {
      document.removeEventListener('click', clickListenerFunc);
    };
  }, []);

  const handleGenre = async (e) => {
    const id = e.target.getAttribute('data-id');

    dispatch(moviesLoadingBegins());

    const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-IND&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_watch_monetization_types=flatrate&with_genres=${id}`;

    // with_genres
    try {
      const response = await fetch(endPoint);

      const { results } = await response.json();

      dispatch(storeMovies(results));
      dispatch(setApiEndPointAndGenere({ endPoint, genereId: id }));
    } catch (err) {
      dispatch(moviesError());
    }
  };

  return { activeLink, handleActiveLink, genres, handleGenre, genreDropDown };
};

export default useNavbarLogic;
