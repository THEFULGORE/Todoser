import classNames from 'classnames';
import React, { useState } from 'react'
import { areEqual, getMonthData } from './Calendar.js';
import './Calendar.scss'

const Calendar = (props) => {

    let monthSelect = React.createRef();
    let yearSelect = React.createRef();

    const dataNames = {
        date: new Date(),
        years: [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        weekday: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        onChange: Function.prototype
    }

    const [state, setState] = useState({
        date: dataNames.date,
        curDate: new Date(),
        selectedDate: null
    })

    const getYear = () => {
        return state.date.getFullYear()
    }

    const getMonth = () => {
        return state.date.getMonth()
    }

    const monthData = getMonthData(getYear(), getMonth());

    const handleDayClick = (date) => {
        console.log(date)
        setState({
            ...state,
            selectedDate: date
        });

        //props.onChange(date);
    }

    const handlePrevMonthButton = () => {
        const date = new Date(state.date.getFullYear(), state.date.getMonth() - 1);
        setState({
            ...state,
            date
        })
    }

    const handleNextMonthButton = () => {
        const date = new Date(state.date.getFullYear(), state.date.getMonth() + 1);
        setState({
            ...state,
            date
        })
    }

    const handleSelectChange = () => {
        const year = yearSelect.value;
        const month = monthSelect.value;

        const date = new Date(year, month);
        setState({
            ...state,
            date
        })
    }
    return (
        <div className='calendar'>
            <header>
                <button onClick={handlePrevMonthButton}>{'<'}</button>
                <select ref={element => monthSelect = element}
                    value={getMonth()}
                    onChange={handleSelectChange}>
                    {dataNames.month.map((name, index) => <option key={name} value={index}>{name}</option>)}
                </select>
                <select ref={element => yearSelect = element}
                    value={getYear()}
                    onChange={handleSelectChange}>
                    {dataNames.years.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
                <button onClick={handleNextMonthButton}>{'>'}</button>
            </header>

            <table>
                <thead>
                    <tr>
                        {dataNames.weekday.map(name => <th key={name}>{name}</th>)}
                    </tr>
                </thead>

                <tbody>
                    {monthData.map((week, index) => (
                        <tr key={index} className='week'>
                            {week.map((date, index) => date ?
                                <td className={classNames('day', {
                                    'today': areEqual(date, state.curDate),
                                    'selected': areEqual(date, state.selectedDate)
                                })}
                                    key={index}
                                    onClick={() => handleDayClick(date)}
                                >{date.getDate()}</td>
                                : <td key={index} />)}
                        </tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default Calendar;
