import React, { Component } from 'react';
import Todo from '../Components/todo';

class Main extends Component {
    render() { 
        const { inputText, todos, onChange_text, onKeyPress, onChange_checkbox } = this.props;

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
                        todos.map((todo) => (
                            <Todo
                                key={todos.indexOf(todo)}
                                idx={todos.indexOf(todo)}
                                text={todo.text}
                                check={todo.check}
                                onChange={onChange_checkbox}
                            />
                        ))
                    }
                </ul>
            </section>
        );
    }
}
 
export default Main;