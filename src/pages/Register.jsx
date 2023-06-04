import React from 'react'

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
                    <input type='file' />
                    <button>Sign Up</button>
                </form>
                <p>You do have an account ? Login</p>
            </div>
        </div>
    )
}

export default Register