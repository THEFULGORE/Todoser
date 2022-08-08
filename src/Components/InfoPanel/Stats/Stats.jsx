import React from 'react'
import ProgressBar from './ProgressBar/ProgressBar'
import './Stats.scss'

const Stats = (props) => {
    if (props.current || props.completed) {
        return (
            <div className='stats'>
                <div className='stats__completed'>
                    <div className='stats__title-container'>
                        <h1 className='stats__title'>{props.completed} tasks</h1>
                        <p className='stats__descr'>Completed</p>
                    </div>
                    <ProgressBar percent={props.percent} />

                </div>
                <div className='stats__completed'>
                    <div className='stats__title-container'>
                        <h1 className='stats__title'>{props.current} tasks</h1>
                        <p className='stats__descr'>In Progress</p>
                    </div>
                    <ProgressBar percent={100 - props.percent} />
                </div>
            </div>
        )
    }
    else return <></>
}

export default Stats
