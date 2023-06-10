import React from 'react'
import Img from "../img/img.png"
import Attach from "../img/attach.png"
const Input = () => {
    return (
        <div className='input'>
            <input type='text' placeholder='Type somethings...' />
            <div className='send'>
                <img src={Attach} alt='' />
                <input type='file' style={{ display: 'none' }} id="file" />
                <lable htmlFor="file">
                    <img src={Img} alt='' />
                </lable>
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input