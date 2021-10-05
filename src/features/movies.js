import { createSlice } from '@reduxjs/toolkit';

const apiKey = process.env.TMDB_API_KEY;

const initialState = {
  value: {
    movieLoading: false,
    movies: [],
    genres: [],
    apiEndPoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-IND&sort_by=popularity.desc&include_adult=true&include_video=true&with_watch_monetization_types=flatrate`,
    currentGenereId: null,
  },
};

export const counterSlice = createSlice({
  name: 'movies',

  initialState,

  reducers: {
    moviesLoadingBegins: (state = initialState) => {
      state.value = { ...state.value, movieLoading: true };
    },

    storeMovies: (state = initialState, action) => {
      state.value = {
        ...state.value,
        movieLoading: false,
        movies: action.payload,
      };
    },

    storeGenres: (state = initialState, action) => {
      state.value = {
        ...state.value,
        movieLoading: false,
        genres: action.payload,
      };
    },

    moviesError: (state = initialState) => {
      state.value = { ...state.value, movieLoading: false };
    },

    setApiEndPointAndGenere: (state = initialState, action) => {
      state.value = {
        ...state.value,
        movieLoading: false,
        apiEndPoint: action.payload.endPoint,
        currentGenereId: action.payload.genereId,
      };
    },
  },
});

export const {
  moviesLoadingBegins,
  storeMovies,
  moviesError,
  storeGenres,
  setApiEndPointAndGenere,
} = counterSlice.actions;

export default counterSlice.reducer;
