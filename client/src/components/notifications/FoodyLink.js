import { useAppContext } from 'context/appContext';
import React from 'react';

export const FoodyLink = ({ slug, title }) => {
  const { getFoody, toggleModal } = useAppContext();

  const showFoodyDetails = () => {
    getFoody(slug);
    toggleModal();
  };
  return (
    <span onClick={showFoodyDetails} className='foody'>
      {' '}
      {title}
    </span>
  );
};
