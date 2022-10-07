import React, { Component } from 'react';

function Todo({idx, text, check, onChange, onClick}) {
    const textStyle = (check) => {
        if (check === true) {
            return {textDecoration: "line-through", opacity: 0.5};
        } else {
            return {};
        }
    }

    return (
        <li className="todo-app__item">
            <div className="todo-app__checkbox">
                <input
                    id={idx}
                    type="checkbox"
                    checked={check}
                    onChange={() => onChange(idx)}
                />
                <label htmlFor={idx}></label>
            </div>
            <h1 className="todo-app__item-detail" style={textStyle(check)}>{text}</h1>
            <img
                className="todo-app__item-x"
                src={require("../img/x.png")}
                onClick={() => onClick(idx)}
            />
        </li>
    );
}

export default Todo