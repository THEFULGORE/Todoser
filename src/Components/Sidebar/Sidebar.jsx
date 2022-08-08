import React from 'react'
import CategoriesContainer from './Categories/CategoriesContainer'
import './Sidebar.scss'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='logo'>
        <img src={require("../../media/logo.png")} alt="" className='logo__img' />
        <h1 className='logo__title1'>Todo</h1>
        <h1 className='logo__title2'>ser</h1>
      </div>
      <CategoriesContainer />
    </div>
  )
}

export default Sidebar
