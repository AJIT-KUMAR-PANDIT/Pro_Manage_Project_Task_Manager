import { configureStore } from '@reduxjs/toolkit';
import { modalReducer,modal2Reducer, boardSwitchReducer, toastyActionhReducer, loaderActionhReducer, itsTaskIdReducer } from './slice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    modal2: modal2Reducer,
    boardSwitch: boardSwitchReducer,
    toastyAction: toastyActionhReducer,
    loaderAction: loaderActionhReducer,
    itsTaskId: itsTaskIdReducer
  },
});

