import { FC } from 'react';
import styles from './DisplayBlock.module.scss';

interface DisplayBlockProps {
  text: string;
  disabled: boolean;
}

export const DisplayBlock: FC<DisplayBlockProps> = (props) => {
  return (
    <div className={`${styles.wrap} ${props.disabled ? styles.disabled : ''}`}>
      {props.text}
    </div>
  );
};
