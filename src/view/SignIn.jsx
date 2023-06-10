import ParticlesBg from 'particles-bg';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeApiRequest } from '../utilities';

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [response, setResponse] =useState('')
  const Navigate = useNavigate()
  const storeUserData = (data) => {
    data = JSON.stringify(data)
    sessionStorage.setItem('userData', data)
  }
  
    const handleLogin = (e) => {
      e.preventDefault()
      const data = {
       email,
        password

      }
      makeApiRequest('/sign-in', 'POST', data).then(response => {  storeUserData(response.data);  Navigate('/home')}).catch( error => setResponse(error.message))
    } 
  return (
    <div className='pa4 black-80 '>
      <ParticlesBg type='cobweb' bg={true} color='#11349f'  />
      <form onSubmit={handleLogin} className='measure center text-left text-white w-full bg-slate-500 p-10 shadow-md shadow-black'>
        <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
          <legend className='f4 fw6 ph0 mh0'>Sign In</legend>
          <div className='mt3'>
        <span className=' text-red-600'>{response}</span>
            <label className='db fw6 lh-copy f6' htmlFor='email'>
              Email
            </label>
            <input
              onChange={e=> setEmail(e.target.value)}
              className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
              type='email'
              name='email'
              id='email'
            />
          </div>
          <div className='mv3'>
            <label className='db fw6 lh-copy f6' htmlFor='password'>
              Password
            </label>
            <input
              onChange={e=> setPassword(e.target.value)}
              className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
              type='password'
              name='password'
              id='password'
            />
          </div>
          <label className='pa0 ma0 lh-copy f6 pointer flex '>
            <input type='checkbox' className='mr-2' />
            Remember me
          </label>
        </fieldset>
        <div className=''>
          <input
            className='b ph3 pv2 input-reset ba  bg-white text-slate-600 rounded-md shadow shadow-black border-0 grow pointer f6 dib'
            type='submit'
            value='Sign in'
          />
        </div>
        {/* <div className='lh-copy mt3'>
          <a href='#0' className='f6 link dim black db b'>
            Sign up
          </a>
          <a href='#0' className='f6 link dim black db'>
            Forgot your password?
          </a>
        </div> */}
      </form>
    </div>
  );
};

export default SignIn;
