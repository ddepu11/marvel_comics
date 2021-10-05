import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movies';

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store;
