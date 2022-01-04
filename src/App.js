import React, { useState } from 'react';
import Info from './Chapter 8/Info';

const App = () => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(!visible);
  };
  return (
    <>
      <button onClick={onClick}>{visible ? '보이기' : '숨기기'}</button>
      <hr />
      {visible && <Info />}
    </>
  );
};
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
