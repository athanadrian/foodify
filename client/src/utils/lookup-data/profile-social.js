import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaViber,
  FaYoutubeSquare,
} from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { RiMessengerLine, RiWhatsappLine } from 'react-icons/ri';

const profileSocial = (social, mobile) => {
  return [
    {
      id: 1,
      Icon: FaYoutubeSquare,
      iconClass: 'youtube-icon',
      value: social?.youtube,
      color: ' #ff0200',
      url: social?.youtube
        ? `https://www.youtube.com/channel/${social?.youtube}`
        : 'https://www.youtube.com',
    },
    {
      id: 2,
      Icon: FaFacebookSquare,
      iconClass: 'facebook-icon',
      value: social?.facebook,
      color: '#3b5998',
      url: social?.facebook
        ? `https://www.facebook.com/${social?.facebook}`
        : 'https://www.facebook.com',
    },
    {
      id: 3,
      Icon: FaInstagramSquare,
      iconClass: 'instagram-icon',
      value: social?.instagram,
      color: ' #fc5345',
      url: social?.instagram
        ? `https://www.instagram.com/${social?.instagram}`
        : 'https://www.instagram.com',
    },
    {
      id: 4,
      Icon: FaTwitterSquare,
      iconClass: 'twitter-icon',
      value: social?.twitter,
      color: '#00acee',
      url: social?.twitter
        ? `https://www.twitter.com/${social?.twitter}`
        : null,
    },
    {
      id: 5,
      Icon: FiPhoneCall,
      iconClass: 'mobile-icon',
      value: mobile,
      color: '#deac1af7',
      size: 28,
      url: mobile ? `tel:${mobile}` : null,
    },
    {
      id: 6,
      Icon: RiMessengerLine,
      iconClass: 'messenger-icon',
      value: social?.messenger,
      color: '#006aff',
      url: social?.messenger ? `https://m.me/${social?.messenger}` : null,
    },
    {
      id: 7,
      Icon: FaViber,
      iconClass: 'viber-icon',
      value: social?.viber,
      color: '#59267C',
      url: social?.viber ? `viber://chat?number=/${social?.viber}` : null,
    },
    {
      id: 8,
      Icon: RiWhatsappLine,
      iconClass: 'whatsApp-icon',
      value: social?.whatsApp,
      color: '#25d366',
      url: social?.whatsApp
        ? `https://api.whatsapp.com/send?phone=${social?.whatsApp}`
        : null,
    },
  ];
};

export default profileSocial;
