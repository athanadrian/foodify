import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats, MdOutlineAddBusiness } from 'react-icons/md';
import { SiJusteat } from 'react-icons/si';
import { RiProfileLine } from 'react-icons/ri';

const links = [
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
];
export default links;
