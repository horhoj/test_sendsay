import { FC, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { calculatorSlice } from '../calculatorSlice';
import { CalculatorBlockAdapter } from '../components/CalculatorBlockAdapter';
import { DIGIT_LIST, DigitItem, OPERATION_LIST, OperationItem } from '../types';
import styles from './RuntimeForm.module.scss';

const MAX_DIGIT = 13;
const INVALID_VALUES = [Infinity, -Infinity];
const MAX_VALUE = Math.pow(10, MAX_DIGIT) - 1;

export const RuntimeForm: FC = () => {
  const calculatorData = useAppSelector(
    calculatorSlice.selectors.getCalculatorData,
  );

  const [operationArr, setOperationArr] = useState<string[]>(['0']);
  const [displayText, setDisplayText] = useState<string>('0');

  const handleBlockClk = (data: string) => {
    //если введено число или точка
    if (DIGIT_LIST.includes(data as DigitItem)) {
      //получаем последнее введенное число
      const last = operationArr[operationArr.length - 1];
      //осуществляем ввод, только если кол-во символов меньше MAX_DIGIT
      if (last.length < MAX_DIGIT) {
        let newLast = '0';
        //если у нас пока только 0 и мы нажимаем точку
        if (last === '0' && data === '.') {
          newLast = '0.';
        }
        //если у нас пока только 0 и мы нажимаем что-то кроме точки
        if (last === '0' && data !== '.') {
          newLast = data;
        }
        //если у нас не ноль и мы что-то нажимаем
        if (last !== '0') {
          newLast = last + data;
        }
        setOperationArr((prev) => {
          const newOperationArr = [...prev];
          newOperationArr[newOperationArr.length - 1] = newLast;
          return newOperationArr;
        });
        // выводим введенное число
        setDisplayText(newLast.toString());
      }
    }
    //если нажата клавиша операции с числами (+, -, X, /)
    if (OPERATION_LIST.includes(data as OperationItem)) {
      // выполняем только если в массиве операций у нас меньше 3 элементов
      //1 элемент это первое число, 2 элемент это операция и 3 элемент это второе число
      if (operationArr.length < 3) {
        //собственно 2 элементом добавляем символ операции и 3 добавляем число 0
        setOperationArr((prev) => [...prev, data, '0']);
      }
    }

    if (data === '=') {
      //вычисляем результат, только число элементов массива операций равно 3
      // т.е. введены 1 число (первый элемент)
      // 2 число (3 элемент)
      // операция (2 элемент)
      if (operationArr.length === 3) {
        //получаем значения
        const firstOperand = Number.parseFloat(operationArr[0]);
        const secondOperand = Number.parseFloat(operationArr[2]);
        const operation = operationArr[1];
        let result = 0;
        //выполняем математическую операцию
        if (operation === '+') {
          result = firstOperand + secondOperand;
        } else if (operation === '-') {
          result = firstOperand - secondOperand;
        } else if (operation === 'x') {
          result = firstOperand * secondOperand;
        } else if (operation === '/') {
          result = firstOperand / secondOperand;
        }
        //очищаем массив операций
        setOperationArr(['0']);
        //выводим результат
        let resultText = result.toString();
        //если ошибка деления на 0
        if (INVALID_VALUES.includes(result)) {
          resultText = 'Не существует!';
          //если в числе больше чем MAX_VALUE, т.е. максимально допустимое число
        } else if (result > MAX_VALUE) {
          resultText = `Переполнение!`;
          //если после точки слишком много цифр (округляем десятичную дробь)
        } else if (result.toString().length > MAX_DIGIT) {
          //кол-во разрядов целой части числа
          const n = result.toString().split('.')[0].length;
          //что бы кол-во разрядов не превышало MAX_DIGIT
          //округляем до кол-ва разрядов после запятой: MAX_DIGIT - n
          //где n - кол-во разрядов до запятой
          resultText = result.toFixed(MAX_DIGIT - n);
        }
        setDisplayText(resultText);
      }
    }
  };

  return (
    <div className={styles.wrap}>
      {calculatorData.length === 0 && (
        <>
          <div>Конфигурация элементов калькулятора не найдена!</div>
          <div>Перейдите на вкладку constructor и создайте ее!</div>
        </>
      )}
      <div className={styles.calculator}>
        {calculatorData.map((calculatorBlock) => (
          <div key={calculatorBlock} className={styles.calculatorBlockWrap}>
            <CalculatorBlockAdapter
              blockType={calculatorBlock}
              active={true}
              disabled={false}
              displayText={displayText}
              onClick={handleBlockClk}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
