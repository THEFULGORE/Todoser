import { connect } from 'react-redux';
import {
    updateNewText, addTodoThunk, getTodosThunk, getListTodosThunk,
    deleteTodoThunk, completeTodoThunk, updateCurTextThunk, signOutUserThunk,
} from '../redux/todo-reducer';
import TodoForm from './TodoForm';
import React, { useEffect } from 'react';
import { useParams, Navigate } from "react-router-dom";
import Header from "./Header/Header";

export const TodoFormContainer = (props) => {
    let { path } = useParams();
    let listName = props.lists.find(el => el.title === path);
    useEffect(() => {
        if (listName) {
            props.getListTodos(listName.id);
        }
        else {
            props.getTodos()
        }
    }, [path])

    if (props.isAuth === false) { return <Navigate to='/login' /> }

    return (
        <>
            <Header path={path} name={props.user.name} photo={props.user.photo} signOut={props.signOut} />
            <TodoForm {...props} path={path} listId={listName ? listName.id : '1'} />
        </>
    )
}


let mapStateToProps = (state) => {
    return {
        todoData: state.todoForm.todoData,
        newText: state.todoForm.newText,
        lists: state.todoForm.lists,
        user: state.todoForm.user,
        isAuth: state.todoForm.isAuth
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateText: (text) => { dispatch(updateNewText(text)) },
        deleteTodo: (id) => { dispatch(deleteTodoThunk(id)) },
        updateCurText: (id, text) => { dispatch(updateCurTextThunk(id, text)) },
        completeTodo: (id, comp) => { dispatch(completeTodoThunk(id, comp)) },
        getTodos: () => { dispatch(getTodosThunk()) },
        getListTodos: (id) => { dispatch(getListTodosThunk(id)) },
        addTodo: (listId, newText) => { dispatch(addTodoThunk(listId, newText)) },
        signOut: () => { dispatch(signOutUserThunk()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoFormContainer)