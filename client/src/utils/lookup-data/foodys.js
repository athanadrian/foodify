import { AiOutlineTable } from 'react-icons/ai';
import { BiFoodMenu } from 'react-icons/bi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

const foodys = [
  {
    id: 1,
    text: 'meze',
    enum: 'meze',
    icon: <MdOutlineRestaurantMenu />,
    desc: 'meze',
  },
  {
    id: 2,
    text: 'al a carte',
    enum: 'alaCarte',
    icon: <BiFoodMenu />,
    desc: 'al a carte',
  },
  {
    id: 3,
    text: 'buffet',
    enum: 'buffet',
    icon: <AiOutlineTable />,
    desc: 'buffet',
  },
  //   {
  //     id: 4,
  //     text: 'very expensive',
  //     enum: 'very expensive',
  //     icon: '€€€€',
  //     desc: icon: '€€€€',
  //   },
];
export default foodys;
