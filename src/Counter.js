import React, { Component } from 'react';

class Counter extends Component {
  // state의 초기값 설정
  state = {
    number: 0,
    fixedNumber: 0,
  };

  render() {
    const { number, fixedNumber } = this.state; // state를 조회할 때는 this. state로 조회
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값 : {fixedNumber}</h2>

        <button
          onClick={() => {
            /*this.setState((prevState) => {
              return {
                number: prevState.number + 1,
              };
            });
            /*this.setState((prevState) => ({
              number: prevState.number + 1,
            }));    이 코드는 함수에서 바로 객체를 반환해줌.*/
            this.setState(
              {
                number: number + 1,
              },
              () => {
                console.log('방금 setstate가 호출 되었습니다.');
                console.log(this.state);
              }
            );
          }}
        >
          +1
        </button>
      </div>
    );
  }
}
export default Counter;
