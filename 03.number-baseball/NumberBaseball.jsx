import React, { useRef, useState } from 'react';
import Try from './Try';
const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arr = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    arr.push(chosen);
  }
  return arr;
};

function NumberBaseball() {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [tries, setTries] = useState([]);
  const [answer, setAnswer] = useState(getNumbers); // lazy init, 호출 한 번만 하고 그 뒤로 무시
  const inputEl = useRef(null);

  const resetForm = () => {
    setTimeout(() => {
      setResult('');
    }, 3000);
    setValue('');
    setAnswer(getNumbers());
    setTries([]);
    inputEl.current.focus();
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (value === answer.join('')) {
      // 정답일때
      setTries([...tries, { try: value, result: '홈런!' }]);
      setResult('홈런!');
      resetForm();
    } else {
      // 오답일 때
      const answerArray = value.split('').map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        // 열번 이상 틀렸을 때
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
        resetForm();
      } else {
        console.log('답은', answer.join(''));
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            console.log('strike', answerArray[i], answer[i]);
            strike++;
          } else if (answer.includes(answerArray[i])) {
            console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
            ball++;
          }
        }
        setTries([...tries, { try: value, result: `${strike} 스트라이크, ${ball}볼입니다.` }]);
        setValue('');
        inputEl.current.focus();
      }
    }
  };

  const onChangeInput = e => {
    setValue(e.target.value);
  };

  onInputRef = e => {};

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도 : `} tryInfo={v} />;
        })}
      </ul>
    </>
  );
}
export default NumberBaseball;
