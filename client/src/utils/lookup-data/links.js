import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats, MdOutlineAddBusiness } from 'react-icons/md';
import { SiJusteat } from 'react-icons/si';
import { RiProfileLine, RiRoadMapLine } from 'react-icons/ri';
import { AiFillNotification } from 'react-icons/ai';
import { FaHandPointRight, FaUserEdit } from 'react-icons/fa';

const links = (username, hasNotifications) => {
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
    { id: 5, text: 'user data', path: 'edit', icon: <FaUserEdit /> },
    {
      id: 6,
      text: 'profile',
      path: `profile/${username}`,
      icon: <RiProfileLine />,
    },
    {
      id: 7,
      text: `${hasNotifications ? 'unread notifications' : 'notifications'}`,
      path: 'notifications',
      icon: hasNotifications ? <FaHandPointRight /> : <AiFillNotification />,
      className: `${hasNotifications ? 'unread' : ''}`,
    },
    { id: 8, text: 'map', path: 'map', icon: <RiRoadMapLine /> },
  ];
};
export default links;
