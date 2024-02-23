import { configureStore } from '@reduxjs/toolkit';
import { modalReducer, boardSwitchReducer, toastyActionhReducer } from './slice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    boardSwitch: boardSwitchReducer,
    toastyAction: toastyActionhReducer
  },
});

