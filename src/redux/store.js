import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movies';
import userReducer from '../features/user';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
  },
});

export default store;
