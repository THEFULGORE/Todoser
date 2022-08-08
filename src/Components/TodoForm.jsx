import React, { useEffect, useState } from "react";
import GoalForm from "./GoalForm";
import './TodoForm.scss';
import 'boxicons';
import Spinner from './Spinner/Spinner.jsx'

const TodoForm = (props) => {

    let [currentList, setCurrentList] = useState();
    let [completeList, setCompleteList] = useState();
    useEffect(() => {
        setCompleteList(props.todoData.filter(el => el.completed).map(el => <GoalForm id={el.id}
            text={el.text}
            completed={el.completed}
            {...props} />))

        setCurrentList(props.todoData.filter(el => !el.completed).map(el => <GoalForm id={el.id}
            text={el.text}
            completed={el.completed}
            {...props} />))
    }, [props.todoData])

    const handleChange = (e) => {
        props.updateText(e.target.value);
    }
    const addNewGoal = () => {
        props.addTodo(props.listId, props.newText);
    }
    return (
        <div className="todoForm">
            <div className="todoForm__input-container">
                <input className="todoForm__input" type="text"
                    onChange={handleChange} placeholder="Add Todo!" value={props.newText} />
                <div className="todoForm__button">
                    <box-icon onClick={addNewGoal} name='plus' animation='tada-hover' color='#ffffff' ></box-icon>
                </div>
            </div>
            {props.todoData
                ?
                <div className="tasks">

                    <div className="tasks__current">
                        <h1 className="tasks__title">Tasks</h1>
                        <div className='goalsList'>{currentList}</div>
                    </div>
                    <div className="tasks__completed">
                        <h1 className="tasks__completed">Completed</h1>
                        <div className='goalsList'>{completeList}</div>
                    </div>
                </div>
            :
            <Spinner />
            }
        </div>
    )
}

export default TodoForm