import React, { Component } from 'react';

class Main extends Component {
    state = {  }

    render() { 
        return (
            <section className='todo-app__main'>
                <input className="todo-app__input" placeholder='What needs to be done?' />
                <ul id="todo-list" className="todo-app__list">
                    <li className="todo-app__item">
                        <div className="todo-app__checkbox">
                            <input id="0" type="checkbox" />
                            <label htmlFor="0"></label>
                        </div>
                        <h1 className="todo-app__item-detail">This is the first TODO.</h1>
                        <img className="todo-app__item-x" src={require("../img/x.png")} />
                    </li>
                </ul>
            </section>
        );
    }
}
 
export default Main;