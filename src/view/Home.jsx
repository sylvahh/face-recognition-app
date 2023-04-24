import React, { useEffect, useState } from 'react'
import ImageLinkForm from '../components/ImageLinkForm'
import FaceRecogintion from '../components/FaceRecogintion'
import Logo from '../components/Logo'
import ParticlesBg from 'particles-bg'
import { makeApiRequest } from '../utilities'

const Home = ({ getImgUtils, imgUtils  }) => {
  const [userData, setUserData] = useState()
    const getUser = JSON.parse(sessionStorage.getItem('userData'))
  useEffect(() => {
    if (getUser) {
      setUserData(getUser)
    }
    // makeApiRequest(`/user/${user.id}`, 'GET', {}).then( response => setUserData(response))
    console.log(getUser)
  }, [])
  
  return (
      <div className=''>
          <ParticlesBg type="cobweb" bg={true} />
          <Logo />
           <ImageLinkForm   getImgUtils={getImgUtils} userData={userData} />
      <FaceRecogintion imgUtils={imgUtils} />
    </div>
  )
}

export default Home