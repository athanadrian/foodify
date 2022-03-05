import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats, MdOutlineAddBusiness } from 'react-icons/md';
import { SiJusteat } from 'react-icons/si';
import { RiProfileLine, RiRoadMapLine } from 'react-icons/ri';
import { AiFillNotification } from 'react-icons/ai';
import { FaHandPointRight } from 'react-icons/fa';

const links = (hasNotifications) => {
  return [
    { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
    {
      id: 2,
      text: 'all foodys',
      path: 'all-foodys',
      icon: <SiJusteat />,
    },
    {
      id: 3,
      text: 'my foodys',
      path: 'my-foodys',
      icon: <MdQueryStats />,
    },
    {
      id: 4,
      text: 'add foody',
      path: 'add-foody',
      icon: <MdOutlineAddBusiness />,
    },
    { id: 5, text: 'profile', path: 'profile', icon: <RiProfileLine /> },
    {
      id: 6,
      text: `${hasNotifications ? 'unread notifications' : 'notifications'}`,
      path: 'notifications',
      icon: hasNotifications ? <FaHandPointRight /> : <AiFillNotification />,
      className: `${hasNotifications ? 'unread' : ''}`,
    },
    { id: 7, text: 'map', path: 'map', icon: <RiRoadMapLine /> },
  ];
};
export default links;
