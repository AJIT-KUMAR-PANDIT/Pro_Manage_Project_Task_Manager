import { createSlice } from '@reduxjs/toolkit';

// Initial state for modal1
const initialModalState = {
  isOpen: false, // Assuming initial state for modal is open
};

// Initial state for modal2
const initialModal2State = {
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
export const modal2Slice = createSlice({
  name: 'modal2',
  initialState: initialModal2State,
  reducers: {
    closeModal: (state) => {
      state.isOpen = false; // Setting isOpen to false when modal is closed
    },
    openModal: (state) => {
      state.isOpen = true; // Setting isOpen to true when modal is opened
    },
  },
});

export const { closeModal: closeModal2, openModal: openModal2 } = modal2Slice.actions;

export const modal2Reducer = modal2Slice.reducer;