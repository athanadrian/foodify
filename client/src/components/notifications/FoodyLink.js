import { useFoodyContext } from 'context/contexts/foodyContext';
import React from 'react';

export const FoodyLink = ({ slug, title }) => {
  const { getFoody, toggleModal } = useFoodyContext();

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
