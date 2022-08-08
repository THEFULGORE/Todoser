import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loginUserThunk } from '../../redux/todo-reducer';
import 'boxicons'
import './Login.scss'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    let navigate = useNavigate();

    useEffect(() => {
        if(props.isAuth) {
            navigate('/', { replace: true });
        }
    }, [props.isAuth])

    const handleLoginClick = () => {
        props.loginUserThunk();
    }

    return (
        <div className='popup'>
            <div className='popup__container'>
                <div className='popup__body'>
                    <div className='popup__content'>
                        <h1 className='popup__title'>Login with</h1>
                        <div>
                            <button onClick={handleLoginClick} type="button" class="login-with-google-btn" >
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.todoForm.isAuth
    }
}

export default connect(mapStateToProps, { loginUserThunk })(Login)
