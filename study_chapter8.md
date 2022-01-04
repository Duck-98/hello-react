## 8장 Hooks

### useState

첫 번째 인자로 현재 상태, 두 번째 인자로 상태를 바꾸는 함수
상태를 변화시킬 땐 항상 불변성 유지함

### useEffect

리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행
마운트 될 때 -> componentDidMount
업데이트 될 때 -> componentDidUpdate

1. 마운트될 때, 업데이트될 때 두 개를 합친 useEffect Hook

예제 코드

```js
import React, { useEffect, useState } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    console.log({
      name,
      nickname,
    });
  });

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeNickName = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input placeholder="이름" onChange={onChangeName} />
        <input placeholder="닉네임" onChange={onChangeNickName} />
      </div>
      <div>
        <b>이름 : {name}</b>
      </div>
      <div>
        <b>닉네임 : {nickname}</b>
      </div>
    </div>
  );
};

export default Info;
```

2. 마운트(componentDidMount)될 때만 쓰는 useEffect Hook
   useEffect 함수의 두 번째 파라미터로 비어 있는 배열 넣는다.

console.log에 처음 렌더링할 때만 console이 찍히고 input 변경 시에는 안찍힘

```js
useEffect(() => {
  console.log(
    {
      name,
      nickname,
    },
    [],
  );
});
```

3. 특정값이 업데이트될 때만 실행하는 useEffect
   useEffect 함수의 두 번째 파라미터에 업데이트될 때 검사하고 싶은 값을 넣는다.
   name을 설정하면 name input이 바뀔때만 콘솔 찍힘. nickname input 바뀌어도 콘솔 안찍힘
   관리하는 state외에 전달받은 props를 넣어도 된다.

```js
useEffect(() => {
  console.log(
    {
      name,
      nickname,
    },
    [name],
  );
});
```

4. 뒷정리함수
   언마운트되기 전 (componentWillUnmount), 업데이트하기 직전(getSnapshotBeforeUpdate)에 작업 수행 하기위해 뒷정리 함수 반환

언마운트, 업데이트를 하기위해 부모 컴포넌트 가시성 추가

```js
const App = () => {
  const [visible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button onClick={onClick}>{visible ? "보이기" : "숨기기"}</button>
      <hr />
      {visible && <Info />}
    </div>
  );
};
```

뒷정리함수 적용

```js
useEffect(() => {
  console.log("일반 상황1 -> 마운트되어서 Info 컴포넌트가 보일 때");
  console.log("일반 상황2 -> 정보가 업데이트 될 때");
  return () => {
    console.log("뒷정리 함수 상황1 : 언마운트 되어서 숨기려할 때");
    console.log(
      "뒷정리 함수 상황2 -> 업데이트 되기 직전에. 즉 input에 값 입력해도 업데이트 직전인 상황나옴.",
    );
    console.log("상황 2는 2번째 배열에 값에 따라 달라짐");
  };
}, [name]);
```

일반 상황 1 : 마운트되어서 Info 컴포넌트가 보일 때
일반 상황 2 : 정보가 업데이트될 때. (useEffect 두 번째 인자에 따라 다름)
뒷정리 함수 1 : 언마운트 되어서 숨기려할 때
뒷정리 함수 2 : 업데이트 되기 직전에. 즉 input에 값 입력해도 업데이트 직전인 상황나옴. 리액트 -> 리액트. (useEffect 두 번째 인자에 따라 다름)

### useReducer

다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트 해주고 싶을 때
지금까지는 onClick 이벤트 같은 누르는 상황에만 값을 업데이트 했음.
reducer(state, action). (현재 상태, 업데이트를 위해 필요한 정보를 담은 액션)
action 값을 받아 새로운 상태로 변환 -> 불변성 유지
어떤 action인지 알려주는 type 필드 필요
컴포넌트 외부에 함수로 설정
useReducer의 가장 큰 장점 : 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낸다.

#### 카운터 구현

```js
function reducer(state, action) {
  switch (action.type) {
    case "INCREASE":
      return { value: state.value + 1 };
    case "DECREASE":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>현재 카운터 값 : {state.value}</p>
      <button onClick={() => dispatch({ type: "INCREASE" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREASE" })}>-1</button>
    </div>
  );
};
```

코드 분석

```js
function reducer(state, action) {
  switch (action.type) {
    case "INCREASE":
      return { value: state.value + 1 };
    case "DECREASE":
      return { value: state.value - 1 };
    default:
      return state;
  }
}
```

컴포넌트 외부에 함수로 설정
useReducer의 가장 큰 장점 : 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낸다.
해당 리듀서의 기본값을 return
const [state, dispatch] = useReducer(reducer, { value: 0 });
state는 현재 가리키고 있는 상태.
dispatch는 액션을 발생시키는 함수
useReducer(reducer, {value: 0}) : reducer는 바깥의 reducer 함수. value는 해당 reducer의 기본값
<button onClick={() => dispatch({ type: 'INCREASE' })}>+1</button>
<button onClick={() => dispatch({ type: 'DECREASE' })}>-1</button>
dispatch 함수 안에 파라미터로 타입을 넣어주면 리듀서 함수가 호출된다.

2. 인풋 상태 관리하기
   reducer 함수

```js
function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}
```

spread 연산자 이용해 state 복사 ( 불변성 유지 )
action으로 e.target 타입 받아와 객체 안에 key를 []로 감싸 자체로 key를 만듬
컴포넌트

```js
const Info = () => {
const [state, dispatch] = useReducer(reducer, {
    name: '',
    nickname: '',
});

const { name, nickname } = state;

const onChange = (e) => {
    dispatch(e.target);
};

return (
    <div>
        <input
          name="name"
          value={name}
          onChange={onChange}
        />
        <input
          name="nickname"
          value={nickname}
          onChange={onChange}
        />
    </div>
};
```

name, value 값 설정 후, e.target 자체를 dispatch의 타입으로 전달

### useMemo

함수 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있다.

```js
const getAverage = numbers => {
  console.log('평균값 계산중..');
  if(numbers.length === 0) return 0;
  const sum = numbers.reduce((a,b) => a+b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');

  const onChange =e => {
    setNumber(e.target.value);
  };

  const onInsert = () => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
   };
const avg = useMemo( ()=> getAverage(list), [list]);

return (
  <div>
    <input value={number} onChange={onChange} />
    <button onClick={onInsert}>등록 </button>
    <ul>
    {list.map((value,index) => (
      <li key = {index}>{value}</li>
    ))}
    </ul>
    <div>
      <b>평균값 :</b> {avg}
    </div>
  </div>
);
};

export default Average;

}
```

### useCallback

useMemo와 비슷한 함수이다. 주로 렌더링 성능을 최적화해야 하는 상황에서 사용되며
이벤트 헨들러 함수를 필요할 때만 생성할 수 있게 해준다.

### useMemo와 useCallback의 차이

useMemo -> 특정 상태 업데이트 될 때만 연산 호출할 수 있게 최적화한다.
useCallback -> 특정 상태 업데이트 될 때 렌더링할 것을 선택해서 렌더링 성능 최적화함.

### useRef

useRef는 함수형 컴포턴트에서 ref를 쉽게 사용할 수 있도록 해준다.

#### ref -> DOM

```js
const inputEl = useRef(null);

const onInsert = useCallback(e => {
  ...
  inputEl.current.focus();
})

<input value={number} onChange={onChange} ref={inputEl} />
<button onClick={onInsert}>등록</button>
```
