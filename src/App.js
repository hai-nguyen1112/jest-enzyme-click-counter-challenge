import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    counter: 0,
    error: false,
  };

  incrementCounter = () => {
    this.setState({ counter: this.state.counter + 1 });
    if (this.state.error) {
      this.setState({ error: false });
    }
  };

  decrementCounter = () => {
    if (this.state.counter > 0) {
      this.setState({ counter: this.state.counter - 1 });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">
          The current counter is {this.state.counter}
        </h1>
        {this.state.error ? (
          <h2 data-test="error-message" style={{ color: 'red' }}>
            The counter can't go below zero
          </h2>
        ) : null}
        <button data-test="increment-button" onClick={this.incrementCounter}>
          Increment Counter
        </button>
        &nbsp;
        <button data-test="decrement-button" onClick={this.decrementCounter}>
          Decrement Counter
        </button>
      </div>
    );
  }
}

export default App;
