import { configureStore } from "@reduxjs/toolkit";

import authReducer from './slices/authSlice.js';
import clientReducer from './slices/clientSlice.js'
import dropDownSlice from "./slices/dropDownSlice.js";
import userSlice from "./slices/userSlice.js";
import quotationReducer from "./slices/quotationSlice";
// import courseReducer from './slices/courseSlice';
// import lectureReducer from './slices/lectureSlice';
// import razorpayReducer from './slices/razorPaySlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    dropdown: dropDownSlice,
    users: userSlice,
    quotation: quotationReducer,
    // razorpay: razorpayReducer,
    // lecture: lectureReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
});

export default store;