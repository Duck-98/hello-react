import React, { useRef, useCallback, useReducer } from 'react';
import TodoInsert from './Chapter 10/components/TodoInsert';
import TodoTemplate from './Chapter 10/components/TodoTemplate';
import TodoList from './Chapter 10/components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: 1,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'Insert':
      //{type : 'Insert', todo : {id : 1, text: 'todo', checked : 'false'}}
      return todos.concat(action.todo);
    case 'Remove':
      //{type : 'Remove', id : 1}
      return todos.filter((todo) => todo.id !== action.id);
    case 'Toggle':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  // 고윳값으로 사용될 id
  // ref를 이용하여 변수 담기
  const nextId = useRef(5);

  /*const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id)); // filter 함수를 이용하여  겉운 id를 갖고 있는 항목을 삭제
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  });
*/

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: 'Insert', todo });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({ type: 'Remove', id });
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({ type: 'Toggle', id });
  }, []);

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
