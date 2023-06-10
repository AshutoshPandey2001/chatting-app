import React from 'react'

const Search = () => {
    return (
        <div className='search'>
            <div className='searchForm'>
                <input type='text' placeholder='Find a user' />
            </div>
            <div className='userChat'>
                <img src='https://images.pexels.com/photos/16354646/pexels-photo-16354646/free-photo-of-city-road-fashion-people.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' />
                <div className='userChatInfo'>
                    <span> Ashu</span>
                </div>

            </div>
        </div>
    )
}

export default Search