import { configureStore } from '@reduxjs/toolkit';
import { modalReducer, modal2Reducer } from './slice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    modal2: modal2Reducer,
  },
});

