## 7장 라이프사이클

### 라이프사이클이란?

라이프사이클 메서드의 종류는 총 9가지다.
will 접두사가 붙은 메서드는 어떤 작업을 작동하기 전에 실행되는 메서드이고.

did 접두사가 붙은 메서드는 어떤 작업을 작동된 후에 실행되는 메서드다.

라이프사이클은 총 3가지, 즉 마운트, 업데이트, 언마운트 카테고리로 나눈다.

- 업데이트 -> 컴포넌트 정보를 업데이트
- 마운트 -> 페이지에 컴포넌트가 나타남
- 언마운트 -> 페이지에서 컴포넌트가 사라짐
  <img width="70%" src="https://user-images.githubusercontent.com/72850354/147877694-eadc6348-1254-4f8e-970e-86e9fa73e9ca.png"/>

### 마운트?

DOM이 생성되고 웹브라우저 상에 나타나는 것을 마운트라고 한다.

- 마운트할 때 호출하는 메서드

1.  컴포넌트 만들기
2.  constructor
3.  getDerivedStateFromProps
4.  render
5.  componentDidMount

constructor -> 컴포넌트를 새로 만들 때 호출되는 클래스 생성자 메서드
getDerivedStateFromProps -> props에 있는 값을 state에 넣을 때 사용하는 메서드
render : 우리가 준비한 ui를 렌더링 하는 메서드
componentDidMount : 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드

### 업데이트

컴포넌트는 다음과 같은 4가지 경우에서 업데이트를 한다.

1.  props가 바뀔 때
2.  state가 바뀔 때
3.  부모 컴포넌트가 리렌더링 될 때
4.  this.forceUpdate로 강제 렌더링을 트리거할 때

#### 업데이트시 호출되는 라이프사이클 메소드들

앞서 정리한 컴포넌트가 업데이트 되는 경우 들중 forceUpdate 를 제외한 나머지의 경우에 해당할때, 호출되는 라이프 사이클 메소드 들은 시간순서대로 정렬하여, 아래와 같다.

1. getDerivedStateFromProps : 마운트 과정에서도 호출되는 메소드입니다, props의 변화에 따라 state에도 변화를 주고 싶을때 사용합니다.
2. shouldComponentUpdate : 컴포넌트가 rerendering 될지에 대한 여부를 결정하는 메소드입니다. boolean값을 return하며 true인 경우에
   rerendering을 진행합니다. (성능개선에 큰 영향을 미칩니다.)
3. render ( forceUpdate 를 호출하여 업데이트가 되는 경우에는 이 과정부터 진행됩니다. shouldComponentUpdate 여부를 따질 필요가 없기 때문이죠)
   : component를 rerendering 합니다.
4. getSnapshotBeforeUpdate : component의 변화를 DOM에 반영하기 바로 직전에 호출하는 메소드
5. componentDidUpdate : 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메소드.
6. componentDidCatch : 오류를 캐치해주는 메소드

### 정리

라이프 사이클 메서드는 컴포넌트 상태의 변화가 있을 때마다 실행하는 메서드다.
서드파티 라이버리를 사용하거나 DOM을 직접 건드려야하는 상황에서 유용하다.

컴포넌트 업데이트의 성능을 개선하기 위해서는 shouldComponentUpdate가 중요하게 사용된다.
