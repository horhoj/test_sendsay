import { FC, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DragStart,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { calculatorSlice } from '../calculatorSlice';
import { CALCULATOR_BLOCK_LIST, CalculatorBlockItem } from '../types';
import { CalculatorBlockAdapter } from '../components/CalculatorBlockAdapter';
import styles from './ConstructorForm.module.scss';
import { EmptyCalculatorModel } from './EmptyCalculatorModel';

const CONSTRUCTOR_BLOCK_LIST_DROPPABLE_ID = 'constructor-block-list';

const MODEL_BLOCK_LIST_DROPPABLE_ID = 'model-block-list';

const getDraggableId = (
  droppableId: string,
  blockName: CalculatorBlockItem,
): string => `${droppableId}_${blockName}`;

export const ConstructorForm: FC = () => {
  const calculatorData = useAppSelector(
    calculatorSlice.selectors.getCalculatorData,
  );

  const dispatch = useAppDispatch();

  //с помощью этого флага добавляем класс disable-pointer-events
  //к constructorBlockList в целях оптимизации производительности при перетаскивании
  const [isDrag, setIsDrag] = useState<boolean>(false);

  const handleDragEnd = (e: DropResult) => {
    setIsDrag(false);
    //обрабатываем добавление элемента из constructorBlockList в modelBlockList
    if (
      e.destination?.droppableId === MODEL_BLOCK_LIST_DROPPABLE_ID &&
      e.source.droppableId === CONSTRUCTOR_BLOCK_LIST_DROPPABLE_ID
    ) {
      const id = e.draggableId.split('_')[1];

      const index = CALCULATOR_BLOCK_LIST.findIndex((item) => item === id);
      const calculatorBlockItem: CalculatorBlockItem =
        CALCULATOR_BLOCK_LIST[index];

      if (CALCULATOR_BLOCK_LIST.includes(calculatorBlockItem)) {
        // console.log(e.destination.index, calculatorBlockItem);
        dispatch(
          calculatorSlice.actions.addBlock({
            index: e.destination.index,
            calculatorBlockItem,
          }),
        );
      }
    }
    //обрабатываем изменение позиции элемента в modelBlockList
    if (
      e.destination?.droppableId === MODEL_BLOCK_LIST_DROPPABLE_ID &&
      e.source.droppableId === MODEL_BLOCK_LIST_DROPPABLE_ID
    ) {
      // console.log(e.source.index, e.destination.index);
      dispatch(
        calculatorSlice.actions.moveBlock({
          beginIndex: e.source.index,
          endIndex: e.destination.index,
        }),
      );
    }
  };

  const handleDragStart = (e: DragStart) => {
    setIsDrag(true);
  };

  const handleDeleteBlock = (calculatorBlock: CalculatorBlockItem) => {
    dispatch(calculatorSlice.actions.deleteBlock(calculatorBlock));
  };

  return (
    <div className={styles.wrap}>
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Droppable
          droppableId={CONSTRUCTOR_BLOCK_LIST_DROPPABLE_ID}
          isDropDisabled={true}
        >
          {(itemDroppableProvided) => {
            return (
              <div
                className={`${styles.constructorBlockList} ${
                  isDrag ? 'disable-pointer-events' : ''
                }`}
                {...itemDroppableProvided.droppableProps}
                ref={itemDroppableProvided.innerRef}
              >
                {CALCULATOR_BLOCK_LIST.map((calculatorBlock, index) => {
                  const isDisabled = calculatorData.includes(calculatorBlock);

                  return (
                    <Draggable
                      key={calculatorBlock}
                      draggableId={getDraggableId(
                        CONSTRUCTOR_BLOCK_LIST_DROPPABLE_ID,
                        calculatorBlock,
                      )}
                      index={index}
                      isDragDisabled={isDisabled}
                    >
                      {(itemDraggableProvided) => (
                        <div
                          className={!isDisabled ? styles.constructorBlock : ''}
                          ref={itemDraggableProvided.innerRef}
                          {...itemDraggableProvided.draggableProps}
                          {...itemDraggableProvided.dragHandleProps}
                        >
                          {!isDisabled && <div className={styles.dragHeader} />}
                          <CalculatorBlockAdapter
                            blockType={calculatorBlock}
                            active={false}
                            disabled={isDisabled}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {itemDroppableProvided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <Droppable
          droppableId={MODEL_BLOCK_LIST_DROPPABLE_ID}
          isDropDisabled={false}
          ignoreContainerClipping={true}
        >
          {(itemDroppableProvided) => {
            return (
              <div
                className={styles.calculatorModel}
                {...itemDroppableProvided.droppableProps}
                ref={itemDroppableProvided.innerRef}
              >
                {calculatorData.length === 0 && <EmptyCalculatorModel />}
                {calculatorData.map((calculatorBlock, index) => (
                  <Draggable
                    key={calculatorBlock}
                    draggableId={getDraggableId(
                      MODEL_BLOCK_LIST_DROPPABLE_ID,
                      calculatorBlock,
                    )}
                    index={index}
                  >
                    {(itemDraggableProvided) => {
                      return (
                        <div
                          key={calculatorBlock}
                          ref={itemDraggableProvided.innerRef}
                          {...itemDraggableProvided.draggableProps}
                          {...itemDraggableProvided.dragHandleProps}
                        >
                          <div
                            className={styles.dragHeader}
                            onDoubleClick={() =>
                              handleDeleteBlock(calculatorBlock)
                            }
                          />
                          <CalculatorBlockAdapter
                            blockType={calculatorBlock}
                            active={false}
                            disabled={false}
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {itemDroppableProvided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
