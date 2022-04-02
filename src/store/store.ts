import { configureStore } from '@reduxjs/toolkit';
import { calculatorSlice } from '../features/calculator/calculatorSlice';
import { appSlice } from './app';

export const store = configureStore({
  devTools: true,
  reducer: {
    app: appSlice.reducer,
    calculator: calculatorSlice.reducer,
  },
});
