import { FC } from 'react';
import { DIGIT_LIST, DigitItem } from '../../types';
import styles from './DigitListBlock.module.scss';

interface DigitListBlockProps {
  disabled: boolean;
  active: boolean;
  onClick(data: string): void;
}

export const DigitListBlock: FC<DigitListBlockProps> = (props) => {
  const handleDigitBtnClk = (digitItem: DigitItem) => {
    if (props.active) {
      props.onClick(digitItem);
    }
  };

  return (
    <div className={styles.wrap}>
      {DIGIT_LIST.map((digitItem) => (
        <button
          key={digitItem}
          type={'button'}
          disabled={props.disabled}
          tabIndex={props.active ? 0 : -1}
          className={`${styles.digitButton} ${props.active ? 'active' : ''}`}
          style={{ gridColumn: `span ${digitItem === '0' ? 2 : 1}` }}
          onClick={() => handleDigitBtnClk(digitItem)}
        >
          {digitItem}
        </button>
      ))}
    </div>
  );
};
