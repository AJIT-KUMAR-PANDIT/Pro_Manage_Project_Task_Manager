import { createSlice } from '@reduxjs/toolkit';

// Initial state for modal1
const initialModalState = {
  isOpen: false, // Assuming initial state for modal is open
};

// Initial state for modal2
const initialBoardSwitch = {
  isOpen: false, // Assuming initial state for modal2 is closed
};

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

// Slice for modal2
export const boardSwitch = createSlice({
  name: 'boardSwitch',
  initialState: initialBoardSwitch,
  reducers: {
    boardSwitchNo: (state) => {
      state.isOpen = false; // Setting isOpen to false when modal is closed
    },
    boardSwitchYes: (state) => {
      state.isOpen = true; // Setting isOpen to true when modal is opened
    },
  },
});

export const { boardSwitchNo, boardSwitchYes} = boardSwitch.actions;

export const boardSwitchReducer = boardSwitch.reducer;
