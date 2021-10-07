import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  moviesError,
  moviesLoadingBegins,
  setApiEndPointAndGenere,
  storeGenres,
  storeMovies,
} from '../../../features/movies';

const useNavbarLogic = () => {
  const history = useHistory();
  const { userLoggedIn } = useSelector((state) => state.user.value);

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
      if (!e.target.matches('.GEN') && genreDropDown.current) {
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

    setActiveLink('/');

    if (history.location.pathname !== '/') {
      history.push('/');
    }

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

  const [keyword, setKeyword] = useState('');

  const handleKeyword = async (e) => {
    const { value } = e.target;

    setKeyword(value);

    if (value) {
      if (history.location.pathname !== '/') {
        history.push('/');
      }

      const searchEndPoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}&language=en-US&include_adult=false`;

      try {
        const response = await fetch(searchEndPoint);

        const { results } = await response.json();

        dispatch(storeMovies(results));
      } catch (err) {
        dispatch(moviesError());
      }
    } else {
      dispatch(storeMovies([]));
    }
  };

  const handleClickOnLogo = () => {
    setActiveLink('/');
    setKeyword('');
    dispatch(storeMovies([]));
  };

  const handleLogOut = () => {};

  return {
    activeLink,
    handleActiveLink,
    genres,
    handleGenre,
    genreDropDown,
    keyword,
    handleKeyword,
    setKeyword,
    handleClickOnLogo,
    userLoggedIn,
    handleLogOut,
  };
};

export default useNavbarLogic;
