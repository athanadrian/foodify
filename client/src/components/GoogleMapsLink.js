import React from 'react';
import { SiGooglemaps } from 'react-icons/si';

const GoogleMapsLink = ({ lat, lng }) => {
  return (
    <a
      href={`http://maps.google.com/maps?q=${lat},${lng}&amp;t=k`}
      rel='noreferrer noopener'
      target='_blank'
      className='google-link'
    >
      <SiGooglemaps size={35} className='google-icon' />
    </a>
  );
};

export default GoogleMapsLink;
