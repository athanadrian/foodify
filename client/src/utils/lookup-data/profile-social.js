import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from 'react-icons/fa';

const profileSocial = (social) => {
  return [
    {
      id: 1,
      Icon: FaYoutubeSquare,
      iconClass: 'youtube-icon',
      value: social?.youtube,
      color: 'green',
      url: social?.youtube
        ? `https://www.youtube.com/channel/${social?.youtube}`
        : 'https://www.youtube.com',
    },
    {
      id: 2,
      Icon: FaFacebookSquare,
      iconClass: 'facebook-icon',
      value: social?.facebook,
      color: 'pink',
      url: 'https://www.facebook.com',
    },
    {
      id: 3,
      Icon: FaInstagramSquare,
      iconClass: 'instagram-icon',
      value: social?.instagram,
      color: 'purple',
      url: social?.youtube
        ? `https://www.instagram.com/${social?.instagram}`
        : 'https://www.instagram.com',
    },
    {
      id: 4,
      Icon: FaTwitterSquare,
      iconClass: 'twitter-icon',
      value: social?.twitter,
      color: 'red',
      url: social?.youtube
        ? `https://www.twitter.com/${social?.twitter}`
        : 'https://www.twitter.com',
    },
  ];
};

export default profileSocial;
