import React, { Component } from 'react';
import Todo from '../Components/todo';

class Main extends Component {
    render() { 
        const { inputText, todos, displayFilter, onChange_text, onKeyPress, onChange_checkbox, onClick_x } = this.props;

        let todoList = undefined;
        if (displayFilter === "All") {
            todoList = todos;
        } else if (displayFilter === "Active") {
            todoList = todos.filter((t) => t.check === false);
        } else {
            todoList = todos.filter((t) => t.check === true);
        }

        return (
            <section className='todo-app__main'>
                <input
                    className="todo-app__input"
                    placeholder='What needs to be done?'
                    value={inputText}
                    onChange={onChange_text}
                    onKeyPress={onKeyPress}
                />
                <ul id="todo-list" className="todo-app__list">
                    {
                        todoList.map((todo) => (
                            <Todo
                                key={todos.indexOf(todo)}
                                idx={todos.indexOf(todo)}
                                text={todo.text}
                                check={todo.check}
                                onChange={onChange_checkbox}
                                onClick={onClick_x}
                            />
                        ))
                    }
                </ul>
            </section>
        );
    }
}
 
export default Main;