import React, { useState } from 'react'
import 'boxicons'
import './GoalForm.scss'
import cn from 'classnames'
const GoalForm = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [text, setText] = useState(props.text);
  const removeTodo = () => {
    props.deleteTodo(props.id)
  }

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateCurText(props.id, text);
  }

  const onTextChange = (e) => {
    setText(e.currentTarget.value);
  }

  const completeTodo = () => {
    props.completeTodo(props.id, props.completed);
  }

  return (
    <div className='goalform'>
      <div className='goalform__checkbox'>
        <input id={props.id} type="radio" className='goalform__radio__input' checked={props.completed}
          onClick={completeTodo} />
        {!editMode &&
          <label for={props.id} className={'goalform__text ' + (props.completed ? 'goalform__complete' : '')}>
            {props.text}
          </label>
        }
        {editMode &&
          <input className='goalform__edit'
            onChange={onTextChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={text} />
        }
      </div>
      <div className='goalform__btn-container'>
        <button className='goalform__btn-remove' onClick={removeTodo}>
          <box-icon name='trash' color='#fff'></box-icon>
        </button>
        <button className='goalform__btn-edit' onClick={activateEditMode}>
          <box-icon name='edit-alt' color='#fff'></box-icon>
        </button>
      </div>
    </div>

  )
}

export default GoalForm