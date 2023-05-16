import React from 'react'
import Tilt from 'react-parallax-tilt';
import logo from '../assets/logo.png'

const Logo = () => {
    return (
            
        <Tilt  className='bg-slate-500  w-fit shadow-lg shadow-black' >
            
                <div  className=' '>
                    <img src={logo} alt="logo" />
            </div>
      </Tilt>
  )
}

export default Logo