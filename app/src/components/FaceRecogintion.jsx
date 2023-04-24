import React, { memo, useEffect, useState } from 'react';
import { calculateBoundingBox } from '../utilities';

const FaceRecogintion = ({ imgUtils = {} }) => {
  const { link, boundingBox } = imgUtils;
  const [boxValues, setBoxValues] = useState([])


  const handleImageLoad = () => {
    setBoxValues(calculateBoundingBox(boundingBox));

  };

  function isObjectEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  const boundingBoxes = ({top, right, bottom, left}, idx) => {
return <div key={idx}
className='bounding-box  '
style={{ bottom:bottom, top: top, right: right,   left:left }}
></div>
  }

  const mappedBoundingBoxes = boxValues.map(boundingBoxes)
   


  return (
    <div className='flex justify-center mt-10 mx-auto relative'>
      <div className='absolute pb-5'>
        <img
          id='imageInput'
          src={link}
          alt=''
          style={{ width: '500px', height: 'auto' }}
          onLoad={handleImageLoad}
        />
        { !isObjectEmpty(boxValues)  && (
          mappedBoundingBoxes
        )}
      </div>
    </div>
  );
};

export default memo(FaceRecogintion);
