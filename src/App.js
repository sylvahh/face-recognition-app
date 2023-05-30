import './App.css';
import Navigation from './components/Navigation';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './view/Home';
import SignIn from './view/SignIn';
import Register from './view/Register';

function App() {
  const [imgUtils, setImgUtils] = useState();
  const getImgUtils = (imgUtils) => {
    setImgUtils(imgUtils);
  };


  return (
    <div className='App p-5 sm:p-10'>
      <Navigation />
      <Routes>
        <Route path='/' element={<SignIn  />} />
        <Route path='/register' element={<Register/>}   />
        <Route path={'/home'} element={<Home getImgUtils={getImgUtils} imgUtils={imgUtils} />} />
      </Routes>
    </div>
  );
}

export default App;
