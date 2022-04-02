import { RootState } from '../../../store/types';
import { CalculatorBlockItem } from '../types';

export const getCalculatorData = (state: RootState): CalculatorBlockItem[] =>
  state.calculator.calculatorData;
