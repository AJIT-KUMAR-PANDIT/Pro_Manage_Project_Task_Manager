import { configureStore } from '@reduxjs/toolkit';
import { modalReducer, boardSwitchReducer } from './slice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    boardSwitch: boardSwitchReducer,
  },
});

