import React, { memo, useEffect, useState } from 'react';
import { calculateBoundingBox, makeApiRequest, makeRequest } from '../utilities';
import { json } from 'react-router-dom';

const ImageLinkForm = ({ getImgUtils, userData }) => {
  const [inputLink, setInputLink] = useState('');
  const [boundingBox, setBoundingBox] = useState();
  const [entries, setEntries] = useState('');
  const [btnClicked, setBtnClicked] = useState(false);

  const { id, name, entries: userEntries, rank } = userData || {};

  const utilsData = {
    link: inputLink,
    boundingBox: boundingBox,
  };
  const setEntry = (entry) => {
    entry = JSON.stringify(entry);
    sessionStorage.setItem('entries', entry);
  };
  const onLinkSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: id,
    };

    makeRequest(inputLink)
      .then((response) => {
        makeApiRequest('/image', 'PUT', data).then((response) => {
          console.log(response.data);
          setBtnClicked(true);
        });
        setBoundingBox(response);
        calculateBoundingBox(response);
      })
      .finally(setBtnClicked(false));
  };
  useEffect(() => {
    if (userData && (entries === '' || btnClicked)) {
      makeApiRequest(`/user/${id}`, 'GET').then((response) => {
        setEntries(response.entries);
        setEntry(response.entries);
      });
    }

    if (boundingBox) {
      getImgUtils(utilsData);
    }
  }, [boundingBox, entries, btnClicked, userData]);

  return (
    <div className=' space-y-5 mt-10'>
      <div>
        <p className='text-2xl font-bold'>
          {' '}
          <span className=' capitalize  text-blue-700'>{name} <span className=''></span> #{rank}</span> your current entry count is...{' '}
          <span className=' text-blue-700'>#{entries === '' ? userEntries : entries}</span>
        </p>
      </div>
      <p className='text-2xl font-semibold'>
        This magic brain will detect faces in your pictures. give it a Try!
      </p>
      <form action='' className='sm:max-w-[50%] mx-auto rounded  shadow shadow-black'>
        <div className='flex space-x-5  flex-shrink  bg-slate-500 p-3 items-center '>
          <input
            type='text'
            onChange={(e) => setInputLink(e.target.value)}
            name='img-link'
            id='img-link'
            placeholder='Enter Imge link'
            className=' placeholder:text-center focus:bg-white transition-all focus:outline-none rounded w-full py-5 bg-slate-300'
          />
          <button
            onClick={(e) => onLinkSubmit(e)}
            className=' bg-slate-300 px-5 py-3 rounded-md shadow-sm shadow-black  hover:bg-white transition-all'
          >
            {' '}
            submit{' '}
          </button>
        </div>
        <div></div>
      </form>
    </div>
  );
};

export default ImageLinkForm;
