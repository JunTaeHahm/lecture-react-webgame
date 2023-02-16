import React, { useCallback, memo } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  // console.log('td redered');

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData) {
      // 한 번 클릭한 셀은 더 클릭 못하게 리턴해버리기
      return;
    }
    // useReducer는 state가 비동기적으로 바뀐다.
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
