// import logo from './logo.svg';
// import './App.css';
import React, { Component } from 'react';

import Header from "./Components/header";
import Main from "./Containers/main";
import Footer from "./Containers/footer";

class App extends Component {
  state = {
    inputText: "",
    todos: [],
  };

  handleChange_text = (e) => {
    this.setState({inputText: e.target.value});
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        const todos = [...this.state.todos];
        this.setState({
          todos: todos.concat({
            text: e.target.value,
            check: false
          }),
          inputText: ""
        });
    }
  };

  handleChange_checkbox = (todoId) => {
    let todos = [...this.state.todos];
    if (todos[todoId].check === false) {
      todos[todoId].check = true;
    } else {
      todos[todoId].check = false;
    }
    this.setState({todos});
  }

  render() { 
    return (
      <div className="todo-app__root">
        <Header />
        <Main
          inputText={this.state.inputText}
          todos={this.state.todos}
          onChange_text={this.handleChange_text}
          onKeyPress={this.handleKeyPress}
          onChange_checkbox={this.handleChange_checkbox}
        />
        <Footer todos={this.state.todos} />
      </div>
    );
  }
}
 
export default App;
