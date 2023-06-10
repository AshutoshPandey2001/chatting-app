import React from 'react'
import '../style.scss'
import Add from '../img/addAvatar.png'

const Register = () => {
    return (
        <div className='formContainer'>
            <div className='fromWrapper'>
                <span className='logo'>Chatting App</span>
                <span className='title'>Register</span>
                <form>
                    <input type='text' placeholder='displayname' />
                    <input type='email' placeholder='email' />
                    <input type='password' placeholder='password' />
                    <input style={{ display: "none" }} type='file' id='file' />
                    <label htmlFor='file'>
                        <img src={Add} alt='' />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign Up</button>
                </form>
                <p>You do have an account ? Login</p>
            </div>
        </div>
    )
}

export default Register