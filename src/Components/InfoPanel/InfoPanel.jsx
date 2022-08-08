import React from 'react'
import Calendar from './Calendar/Calendar.jsx'
import './InfoPanel.scss'
import StatsContainer from './Stats/StatsContainer.jsx'

const InfoPanel = () => {
  return (
    <div className='infoPanel'>
      <Calendar/>
      <StatsContainer/>
    </div>
  )
}

export default InfoPanel
