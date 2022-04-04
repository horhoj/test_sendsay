import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalculatorBlockItem } from '../types';
import { SLICE_NAME } from './types';

interface InitialState {
  calculatorData: CalculatorBlockItem[];
}

const initialState: InitialState = {
  calculatorData: [],
};

export const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    deleteBlock: (state, action: PayloadAction<CalculatorBlockItem>) => {
      state.calculatorData = state.calculatorData.filter(
        (calculatorBlockItem) => calculatorBlockItem !== action.payload,
      );
    },
    addBlock: (
      state,
      action: PayloadAction<{
        index: number;
        calculatorBlockItem: CalculatorBlockItem;
      }>,
    ) => {
      state.calculatorData.splice(
        action.payload.index,
        0,
        action.payload.calculatorBlockItem,
      );
    },
    moveBlock: (
      state,
      action: PayloadAction<{ beginIndex: number; endIndex: number }>,
    ) => {
      const move = state.calculatorData.splice(action.payload.beginIndex, 1);
      state.calculatorData.splice(action.payload.endIndex, 0, ...move);
    },
  },
});
