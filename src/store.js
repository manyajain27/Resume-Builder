import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  // You can customize middleware if needed, but thunk is included by default
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools in development mode
  
});

export default store;
