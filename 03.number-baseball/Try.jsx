import React, { memo } from 'react';

const Try = memo(({ tryInfo }) => { // 부모컴포넌트가 변경됐을 때 자식컴포넌트가 리렌더링 되는걸 막는다
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;
