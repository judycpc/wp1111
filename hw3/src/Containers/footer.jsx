import React, { Component } from 'react';

class Footer extends Component {
    render() { 
        const { todos, displayFilter, onClick_display, onClick_clean } = this.props;
        const todoCnt = todos.length;
        const leftCnt = todos.filter((t) => t.check === false).length;

        let class_all, class_active, class_completed = undefined;
        if (displayFilter === "All") { class_all = "focus"; }
        else if (displayFilter === "Active") { class_active = "focus"; }
        else { class_completed = "focus"; }


        let buttonStyle = {visibility: "hidden"};
        if (todoCnt - leftCnt > 0) {
            buttonStyle = {visibility: "visible"};
        }

        if (todoCnt > 0) {
            return (
                <footer className="todo-app__footer" id="todo-footer">
                    <div className="todo-app__total">
                        <span id='todo-count'>{leftCnt}</span>
                        &ensp;left
                    </div>
                    <ul className="todo-app__view-buttons">
                        <li><button
                            id='todo-all'
                            className={class_all}
                            onClick={() => onClick_display("All")}
                        >
                            All
                        </button></li>
                        <li><button
                            id="todo-active"
                            className={class_active}
                            onClick={() => onClick_display("Active")}
                        >
                            Active
                        </button></li>
                        <li><button
                            id="todo-completed"
                            className={class_completed}
                            onClick={() => onClick_display("Completed")}
                        >
                            Completed
                        </button></li>
                    </ul>
                    <div
                        className="todo-app__clean"
                        style={buttonStyle}
                        onClick={onClick_clean}
                    >
                        <button id="todo-clear-complete">Clear completed</button>
                    </div>
                </footer>
            );
        }
    }
}
 
export default Footer;