import React from 'react'

const Navbar = () => {
    return (
        <div className='navbar'>
            <span className='logo'> Chatting app
            </span>
            <div className='user'>
                <img src='https://images.pexels.com/photos/16354646/pexels-photo-16354646/free-photo-of-city-road-fashion-people.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' />
                <span>Ashu</span>
                <button>Logout</button>
            </div>
        </div>
    )
}

export default Navbar