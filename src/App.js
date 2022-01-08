import React, { useState, useRef, useCallback } from 'react';
import TodoInsert from './Chapter 10/components/TodoInsert';
import TodoTemplate from './Chapter 10/components/TodoTemplate';
import TodoList from './Chapter 10/components/TodoList';
const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트 공부하기',
      checked: true,
    },
    {
      id: 2,
      text: '웨이트 운동하기',
      checked: true,
    },
    {
      id: 3,
      text: '물 2리터 마시기',
      checked: true,
    },
    {
      id: 4,
      text: 'Velog 업데이트하기',
      checked: false,
    },
  ]);
  // 고윳값으로 사용될 id
  // ref를 이용하여 변수 담기
  const nextId = useRef(5);

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id)); // filter 함수를 이용하여  겉운 id를 갖고 있는 항목을 삭제
    },
    [todos],
  );

  const onToggle = useCallback((id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  });

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  );
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

/*
class App extends Component {
  render() {
    return (
      <div className='="App'>
        <header>
          <img src={logo} className="logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="http://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
/*import LifeCycleSample from './LifeCycleSample';
import ErrorBoundary from './ErrorBoundary';

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
  state = {
    color: '#000000',
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <ErrorBoundary>
          <LifeCycleSample color={this.state.color} />
        </ErrorBoundary>
      </div>
    );
  }
}
*/

export default App;
