import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './Categories.scss'
import { connect } from 'react-redux';
import { addListThunk } from '../../../redux/todo-reducer';

const Categories = (props) => {
    const [state, setState] = useState(false);
    let [text, setText] = useState();

    const onTextChange = (e) => {
        setText(e.currentTarget.value);
    }

    const deactivateEditMode = () => {
        setState(false);
        setText('');
        props.addListThunk(text);
    }

    const handleClick = () => {
        setState(true);
    }

    return (
        <div className='categories'>
            <div>

                <div className='categories__title'>
                    <NavLink className='categories__text' to='/'>Home</NavLink>
                </div>
                {
                    props.lists.map(el => {
                        return (
                            <div key={el.id} className='categories__title'>
                                <NavLink className='categories__text' to={`/${el.title}/`}>
                                    {el.title}
                                </NavLink>
                            </div>
                        )
                    })
                }
                <div>
                    {state ? <input onChange={onTextChange}
                        className='categories__input'
                        placeholder="Add Categorie!"
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={text} />
                        :
                        <button className='categories__button' onClick={handleClick}><h2>Add Category</h2></button>
                    }
                </div>
            </div>
        </div>
    )
}

export default connect(null, { addListThunk })(Categories);
