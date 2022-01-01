## 6장

반복적인 데이터를 렌더링하는 방법을 배움.
컴포넌트 배열을 렌더링 할 때는 key값 설정을 조심해야함.
(key값은 항상 유일해야한다)

상태 안에서 배열을 변형할 때는 배열에 직접 접근하여 수정하는 것이 아니라 concat, filter등 과 같은 배열 내장함수를 이용하여
새로운 배열을 만든 후 새로운 상태로 설정해줘야 함.

## 배열내장함수

### concat

인자로 주어진 배열이나 값들을 기존 배열에 합쳐 새로운 배열을 만듬

- 기존배열을 변경하지 않음
- 추가된 새로운 배열을 반환함

```js
const array1 = ["a", "b", "c"];
const array2 = ["d", "e", "f"];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]
```

### filter

주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환

```js
const words = [
  "spray",
  "limit",
  "elite",
  "exuberant",
  "destruction",
  "present",
];

const result = words.filter((word) => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

### forEach

배열을 각각 하나씩 나열해줌

```js
const array1 = ["a", "b", "c"];

array1.forEach((element) => console.log(element));

// expected output: "a"
// expected output: "b"
// expected output: "c"
```

### map

배열안의 각 원소를 변환할 때 사용하고 새로운 배열을 만들어줌

```js
const array = [1, 2, 3, 4, 5];

const x = array.map((n) => n + n);
console.log(x);
// expected output : array = [2,4,6,8,10]
```

### indexOf

원하는 항목이 배열의 몇 번째 항목인지 찾아주는 함수

```js
const fruit = ["사과", "딸기", "바나나", "수박"];
const index = fruit.indexOf("수박");
console.log(index);
// 찍히는 값 = 4
```

### findIndex

배열안에 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환합니다. 만족하는 요소가 없으면 -1을 반환합니다.

```js
const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// expected output: 3
```

### find

배열 안 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환합니다. 그런 요소가 없다면 undefined를 반환합니다.
(findIndex와 다르게 값을 반환해줌)

```js
const array1 = [5, 12, 8, 130, 44];

const found = array1.find((element) => element > 10);

console.log(found);
// expected output: 12
```

### splice

원하는 항목을 배열에서 제거하거나 새요소를 추가하거나 교체해줌

```js
const months = ["Jan", "March", "April", "June"];
months.splice(1, 0, "Feb"); // 1번 인덱스에 feb 추가
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, "May"); // 4번 인덱스에서 하나 제거 후 may 추가
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

### slice

배열을 잘라날 때 사용하지만, 기존 배열은 건들지 않음

```js
const animals = ["ant", "bison", "camel", "duck", "elephant"];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// expected output: Array ["camel", "duck"]
```

### shift, pop

shift : 첫번째 원소를 배열에서 추출( 추출 후 배열에서 사라짐)

pop : 마지막 원소를 추출(사라짐)

```js

const numbers = [10, 20, 30, 40];

const value = numbers.shift();
console.log(value);
// 찍히는 값 = [10]
console.log(numbers);
// 찍히는 값 = [20, 30, 40]
pop : 마지막 원소를 배열에서 추출

const numbers2 = [10, 20, 30, 40];
const values = numbers2.pop();
console.log(values);
// 찍히는 값 = [40]
console.log(numbers2);
// 찍히는 값 = [10, 20, 30]
```

### unshift

배열의 맨 앞에 새로운 원소 추가

```js
const numbers = [10, 20, 30, 40];

numbers.unshift(5);
console.log(numbers);
//expected output :  [5, 10, 20, 30, 40]
```

### join

배열안의 값을 문자열로 합쳐줌

```js
const elements = ["Fire", "Air", "Water"];

console.log(elements.join());
// expected output: "Fire,Air,Water"

console.log(elements.join(""));
// expected output: "FireAirWater"

console.log(elements.join("-"));
// expected output: "Fire-Air-Water"
```

### reduce

배열 연산 함수

```js
const array1 = [1, 2, 3, 4];
const reducer = (previousValue, currentValue) => previousValue + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```
