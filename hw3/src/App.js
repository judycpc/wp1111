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
    displayFilter: "All",
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

        if (this.state.displayFilter === "Completed") {
          this.setState({ displayFilter: "All" });
        }
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

  handleClick_x = (todoId) => {
    let todos = [...this.state.todos];
    todos.splice(todoId, 1);
    this.setState({todos});
  }

  handleClick_display = (displayFilter) => {
    this.setState({displayFilter});
  }

  handleClick_clean = () => {
    let todos = [...this.state.todos];
    todos = todos.filter(todo => todo.check === false);
    this.setState({todos});
  }

  render() { 
    return (
      <div className="todo-app__root">
        <Header />
        <Main
          inputText={this.state.inputText}
          todos={this.state.todos}
          displayFilter={this.state.displayFilter}
          onChange_text={this.handleChange_text}
          onKeyPress={this.handleKeyPress}
          onChange_checkbox={this.handleChange_checkbox}
          onClick_x={this.handleClick_x}
        />
        <Footer
          todos={this.state.todos}
          displayFilter={this.state.displayFilter}
          onClick_display={this.handleClick_display}
          onClick_clean={this.handleClick_clean}
        />
      </div>
    );
  }
}
 
export default App;
