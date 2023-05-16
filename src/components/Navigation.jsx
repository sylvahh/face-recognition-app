import React from 'react'
import { useLocation } from 'react-router-dom'

const Navigation = () => {
 const path = useLocation().pathname
  return (
    <nav className=' flex justify-end  space-x-5'>
          <a href="/" className={`${path !== '/register'  && 'hidden'} text-black font-semibold  capitalize`}> sign in </a> 
          <a href="/register" className={`${(path !== '/' ) && 'hidden'} text-black font-semibold  capitalize`}> register </a> 
          <a href="/" className={`${(path === '/'|| path === '/register' ) && 'hidden'} text-black font-semibold  capitalize`}> sign out </a> 
    </nav>

  )
}

export default Navigation