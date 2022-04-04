import { FC } from 'react';
import styles from './ResultOperationBlock.module.scss';

interface ResultOperationBlockProps {
  disabled: boolean;
  active: boolean;
  onClick(data: string): void;
}

export const ResultOperationBlock: FC<ResultOperationBlockProps> = (props) => {
  const handleResultOperationBtnClk = () => {
    if (props.active) {
      props.onClick('=');
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
