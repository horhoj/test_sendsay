import { FC } from 'react';
import { OPERATION_LIST, OperationItem } from '../../types';
import styles from './OperationListBlock.module.scss';

interface OperationListBlockProps {
  disabled: boolean;
  active: boolean;
}

export const OperationListBlock: FC<OperationListBlockProps> = (props) => {
  const handleOperationBtnClk = (operation: OperationItem) => {
    if (props.active) {
      console.log(operation);
    }
  };

  return (
    <div className={styles.wrap}>
      {OPERATION_LIST.map((operationItem) => (
        <button
          key={operationItem}
          type={'button'}
          disabled={props.disabled}
          tabIndex={props.active ? 0 : -1}
          className={`${styles.operationButton} ${
            props.active ? 'active' : ''
          }`}
          onClick={() => handleOperationBtnClk(operationItem)}
        >
          {operationItem}
        </button>
      ))}
    </div>
  );
};
