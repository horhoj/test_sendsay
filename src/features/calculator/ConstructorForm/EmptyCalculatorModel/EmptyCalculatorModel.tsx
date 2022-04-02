import { FC } from 'react';
import * as icons from './EmptyCalculatorModelIcons';
import styles from './EmptyCalculatorModel.module.scss';

export const EmptyCalculatorModel: FC = () => {
  return (
    <div className={styles.calculatorModel}>
      <div>{icons.addIcon}</div>
      <div className={styles.calculatorModelTextHelper1}>Перетащите сюда</div>
      <div className={styles.calculatorModelTextHelper2}>
        <div>любой элемент</div>
        <div>из левой панели</div>
      </div>
    </div>
  );
};
