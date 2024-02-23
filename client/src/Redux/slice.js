import { createSlice } from '@reduxjs/toolkit';

// Initial state for modal1
const initialModalState = {
  isOpen: false, // Assuming initial state for modal is open
};

// Initial state for modal2
const initialBoardSwitch = {
  isBoardSwitch: false, // Assuming initial state for modal2 is closed
};

const initialtoasty={
  toasty:false
}

const initialLoader={
  loader:false
}
// Slice for modal1
export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialModalState,
  reducers: {
    closeModal: (state) => {
      state.isOpen = false; // Setting isOpen to false when modal is closed
    },
    openModal: (state) => {
      state.isOpen = true; // Setting isOpen to true when modal is opened
    },
  },
});

export const { closeModal: closeModal1, openModal: openModal1 } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;

// Slice for boardSwitch
export const boardSwitch = createSlice({
  name: 'boardSwitch',
  initialState: initialBoardSwitch,
  reducers: {
    toggleBoardSwitch: (state) => {
      state.isBoardSwitch = !state.isBoardSwitch; // Toggle the value
    },
  },
});

export const { toggleBoardSwitch } = boardSwitch.actions;

export const boardSwitchReducer = boardSwitch.reducer;


// Slice for toasty
export const toastyAction = createSlice({
  name: 'toastyAction',
  initialState: initialtoasty,
  reducers: {
    toggleToastyAction: (state) => {
      state.toasty = !state.toasty; // Toggle the value
    },
  },
});

export const { toggleToastyAction } = toastyAction.actions;

export const toastyActionhReducer = toastyAction.reducer;


export const loaderAction = createSlice({
  name: 'loaderAction',
  initialState: initialLoader,
  reducers: {
    toggleLoader: (state) => {
      state.loader = !state.loader; // Toggle the value
    },
  },
});

export const { toggleLoader } = loaderAction.actions;

export const loaderActionhReducer = loaderAction.reducer;