## 14장

### 비동기 작업이란?

시간이 많이 걸리는 작업을 기다리면 작업의 효율이 떨어진다.
그렇기 때문에 비동기 작업을 이용하여 작업을 효율적으로 만들어준다.

만약 작업을 동기적으로 처리한다면, 요청이 끝날 때까지 기다리는 동안 다른 작업은 하지 못한 채 중지가 되야한다.
그리고 작업이 끝나면 다른 작업을 할 수 있다.

하지만 이러한 작업을 비동기적으로 처리한다면 웹 어플리케이션이 멈추지 않기 때문에 동시에 여러가지 요청을 처리할 수 있으며,
기다리는 과정에서 다른 함수도 호출할 수 있다.

이러한 비동기적 처리를 하기 위해서는 우리는 setTimeout 함수를 이용한다.

```js
function printme() {
  console.log("안녕하세요");
}

setTimeout(printme, 3000);

console.log("대기");

/* 예상 처리 결과
 대기
 안녕하세요!
*/
```

### Callback 함수

```js
function increase(number, callback) {
  setTimeout(() => {
    const result = result + 10;
    if (callback) {
      callback(result);
    }
  }, 1000);
}

console.log("작업시작");
increase(0, (result) => {
  console.log(result);

  increase(result, (result) => {
    console.log(result);

    increase(result, (result) => {
      console.log(result);

      increase(result, (result) => {
        console.log(result);
        console.log("작업 완료");
      });
    });
  });
/* 결과
작업시작
0
10
20
30
40
작업 완료
*/
```

위와 같은 상황을 콜백지옥이라고 표현한다.
콜백 안에 또 다시 콜백이 중첩되어 코드의 가독성이 떨어지기 때문이다.

### Promise 함수

위와 같은 콜백 지옥이 되지 않게 나온 함수이다.

```js
function increase(number) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = number + 10;
      if (result > 50) {
        const e = new Error("number is too big");
        return reject(e);
      }
      resolve(result);
    }, 1000);
  });
  return promise;
}

increase(0)
  .then((number) => {
    console.log(number);
    return increase(number);
  })
  .then((number) => {
    console.log(number);
    return increase(number);
  })
  .then((number) => {
    console.log(number);
    return increase(number);
  })
  .catch((e) => {
    // 에러 발생 시
    console.log(e);
  });
```

Promise 함수를 이용한 예시는 함수를 여러 번 감싸는 것이 아니라, .then을 이용하여 그다음 작업을 설정하기 때문에 콜백지옥이 발생하지 않는다.

### async/ await

asycn, await은 promise를 더욱 쉽게 사용할 수 있게 해주는 문법이다.

```js
function increase(number) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = number + 10;
      if (result > 50) {
        const e = new Error("number is too big");
        return reject(e);
      }
      resolve(result);
    }, 1000);
  });
  return promise;
}
async function runTasks() {
  try {
    let result = await increase(0);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
```
