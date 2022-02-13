import React from 'react';
import Foody from '../../assets/images/foody.svg';
import MyFoody from '../../assets/images/my-foody.svg';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../wrappers/MapToggle';

const MapToggle = () => {
  const { getAllFoodys, getMyFoodys } = useAppContext();
  return (
    <Wrapper>
      <div className='btn-container'>
        <button className='btn-cover all-foodys' onClick={getAllFoodys}>
          <img src={Foody} alt='All Foodys' />
        </button>
        <button className='btn-cover my-foodys' onClick={getMyFoodys}>
          <img src={MyFoody} alt='My Foodys' />
        </button>
      </div>
    </Wrapper>
  );
};

export default MapToggle;
