export const OPERATION_LIST = ['/', 'x', '-', '+'] as const;

export type OperationItem = typeof OPERATION_LIST[number];

export const DIGIT_LIST = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '.',
] as const;

export type DigitItem = typeof DIGIT_LIST[number];

export const CALCULATOR_BLOCK_LIST = [
  'DisplayBlock',
  'OperationListBlock',
  'DigitListBlock',
  'ResultOperationBlock',
] as const;

export type CalculatorBlockItem = typeof CALCULATOR_BLOCK_LIST[number];
