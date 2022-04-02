import { FC } from 'react';
import styles from './ResultOperationBlock.module.scss';

interface ResultOperationBlockProps {
  disabled: boolean;
  active: boolean;
}

export const ResultOperationBlock: FC<ResultOperationBlockProps> = (props) => {
  const handleResultOperationBtnClk = () => {
    if (props.active) {
      console.log('result');
    }
  };

  return (
    <button
      type={'button'}
      className={`${styles.wrap} ${props.active ? 'active' : ''}`}
      tabIndex={props.active ? 0 : -1}
      disabled={props.disabled}
      onClick={handleResultOperationBtnClk}
    >
      =
    </button>
  );
};
