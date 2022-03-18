import { AiOutlineTable } from 'react-icons/ai';
import { BiFoodMenu } from 'react-icons/bi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

const menus = [
  {
    id: 1,
    text: 'Meze',
    enum: 'meze',
    icon: <MdOutlineRestaurantMenu />,
    desc: 'meze',
  },
  {
    id: 2,
    text: 'Al a Carte',
    enum: 'alaCarte',
    icon: <BiFoodMenu />,
    desc: 'al a carte',
  },
  {
    id: 3,
    text: 'Buffet',
    enum: 'buffet',
    icon: <AiOutlineTable />,
    desc: 'buffet',
  },
];
export default menus;
