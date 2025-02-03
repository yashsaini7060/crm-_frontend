import { configureStore } from "@reduxjs/toolkit";

import authReducer from './slices/authSlice.js';
import clientReducer from './slices/clientSlice.js'
import dropDownSlice from "./slices/dropDownSlice.js";
// import courseReducer from './slices/courseSlice';
// import lectureReducer from './slices/lectureSlice';
// import razorpayReducer from './slices/razorPaySlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    dropdown: dropDownSlice
    // razorpay: razorpayReducer,
    // lecture: lectureReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
});

export default store;