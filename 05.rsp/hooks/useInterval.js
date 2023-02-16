import React, { useEffect, useRef } from 'react';

// const [isRunning, setIsRunning] = useState(true)
// useInterval(()=>{
//   console.log('hello')
// },isRunning ? 1000 : null)

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      // 항상 최신 콜백을 담아 둘 수 있게
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  return savedCallback.current;
}

export default useInterval;
