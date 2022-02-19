import React from 'react';
import Compass from '../../assets/images/compass.svg';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../wrappers/MapLocate';

const MapLocate = ({ panTo }) => {
  const { myLocation } = useAppContext();
  return (
    <Wrapper>
      <button
        title='Show my location'
        className='btn-cover locate'
        onClick={() =>
          panTo({
            lat: myLocation.coordinates.lat,
            lng: myLocation.coordinates.lng,
          })
        }
      >
        <img src={Compass} alt='compass' />
      </button>
    </Wrapper>
  );
};

export default MapLocate;
