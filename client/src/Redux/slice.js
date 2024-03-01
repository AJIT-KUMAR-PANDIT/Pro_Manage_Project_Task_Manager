import { createSlice } from '@reduxjs/toolkit';


const initialModalState = {
  isOpen: false, 
};

const initialModal2State = {
  isOpen: false, 
};



const initialBoardSwitch = {
  isBoardSwitch: false, 
};

const initialtoasty={
  toasty:false,
}

const initialLoader={
  loader:false,
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


const initialItsTaskIdState = {
  taskId: null, // Assuming initial value for task ID is null
};

// Slice for itsTaskId
export const itsTaskIdSlice = createSlice({
  name: 'itsTaskId',
  initialState: initialItsTaskIdState,
  reducers: {
    setTaskId: (state, action) => {
      state.taskId = action.payload; // Set the task ID to the provided value
    },
    clearTaskId: (state) => {
      state.taskId = null; // Clear the task ID
    },
  },
});

export const { setTaskId, clearTaskId } = itsTaskIdSlice.actions;

export const itsTaskIdReducer = itsTaskIdSlice.reducer;

