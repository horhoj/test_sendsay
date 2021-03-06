import { FC } from 'react';
import { CalculatorBlockItem } from '../../types';
import { DisplayBlock } from '../DisplayBlock';
import { OperationListBlock } from '../OperationListBlock';
import { DigitListBlock } from '../DigitListBlock';
import { ResultOperationBlock } from '../ResultOperationBlock';

interface CalculatorBlockAdapterProps {
  blockType: CalculatorBlockItem;
  active: boolean;
  disabled: boolean;
  displayText?: string;
  onClick?(data: string): void;
}

export const CalculatorBlockAdapter: FC<CalculatorBlockAdapterProps> = (
  props,
) => {
  if (props.blockType === 'DisplayBlock') {
    return (
      <DisplayBlock
        text={props.displayText ? props.displayText : '0'}
        disabled={props.disabled}
      />
    );
  }
  if (props.blockType === 'OperationListBlock') {
    return (
      <OperationListBlock
        disabled={props.disabled}
        active={props.active}
        onClick={(data) => props.onClick && props.onClick(data)}
      />
    );
  }
  if (props.blockType === 'DigitListBlock') {
    return (
      <DigitListBlock
        disabled={props.disabled}
        active={props.active}
        onClick={(data) => props.onClick && props.onClick(data)}
      />
    );
  }
  if (props.blockType === 'ResultOperationBlock') {
    return (
      <ResultOperationBlock
        disabled={props.disabled}
        active={props.active}
        onClick={(data) => props.onClick && props.onClick(data)}
      />
    );
  }
  return null;
};
