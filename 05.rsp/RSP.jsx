import React, { useEffect, useRef, useState } from 'react';
import useInterval from './hooks/useInterval';

// 클래스형
// constructor -> render -> ref -> componentDidMount
// ->(setState/props 변경 시 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
// + 부모가 나를 제거했을 때 -> componentWillUnmount -> 소멸

// componentDidMount : 컴포넌트가 첫 렌더링 된 후, 주로 비동기 요청

// componentDidUpdate : 리렌더링 후
// componentWillUnmount : 컴포넌트가 제거되기 직전, 주로 비동기 요청 정리


const rspCoords = {
  rock: '0',
  scissors: '-142px',
  paper: '-284px',
};

const scores = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => {
    return v[1] === imgCoord;
  })[0];
};

function RSP() {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissors);
    } else if (imgCoord === rspCoords.scissors) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  };

  useInterval(changeHand, isRunning ? 100 : null);

  const onClickBtn = (choice) => () => {
    if (isRunning) {
      setIsRunning(false);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        setResult('비겼습니다.');
      } else if ([-1, 2].includes(diff)) {
        setResult('이겼습니다.');
        setScore((prev) => prev + 1);
      } else {
        setResult('졌습니다.');
        setScore((prev) => prev - 1);
      }
      setTimeout(() => {
        setIsRunning(true);
      }, 1000);
    }
  };

  return (
    <>
      <div
        id='computer'
        style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}
      />
      <div>
        <button id='rock' className='btn' onClick={onClickBtn('rock')}>
          바위
        </button>
        <button id='scissors' className='btn' onClick={onClickBtn('scissors')}>
          가위
        </button>
        <button id='paper' className='btn' onClick={onClickBtn('paper')}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
}

export default RSP;
