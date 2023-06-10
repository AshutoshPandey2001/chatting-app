import React from 'react'
import '../style.scss'
import Add from '../img/addAvatar.png'

const Login = () => {
    return (
        <div className='formContainer'>
            <div className='fromWrapper'>
                <span className='logo'>Chatting App</span>
                <span className='title'>Login</span>
                <form>
                    <input type='email' placeholder='email' />
                    <input type='password' placeholder='password' />

                    <button>Sign in</button>
                </form>
                <p>You don't have an account ? Register</p>
            </div>
        </div>
    )
}

export default Login