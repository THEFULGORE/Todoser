import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Stats from './Stats.jsx'

const StatsContainer = (props) => {
    const [tasks, setTasks] = useState({
        completed: 0,
        current:0,
        percent: 0
    });
    useEffect(() => {
        if (props.todoData) {
            setTasks(() => {
                let completed = props.todoData.filter((el) => el.completed).length
                let total = props.todoData.length;
                let current = total - completed;
                let percent = Math.round(completed / total * 100);
                return {
                    completed,
                    current,
                    percent
                }
            })
        }
    }, [props.todoData])

    return (
        <Stats {...tasks}/>
    )
}

let mapStateToProps = (state) => {
    return {
        todoData: state.todoForm.todoData,
    }
}

export default connect(mapStateToProps, null)(StatsContainer);
