import { AiOutlineTable } from 'react-icons/ai';
import { BiFoodMenu } from 'react-icons/bi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

const preferences = [
  {
    id: 1,
    text: 'not-interested',
    enum: 'notInterested',
    icon: <MdOutlineRestaurantMenu />,
    desc: 'not-interested',
  },
  {
    id: 2,
    text: 'visited',
    enum: 'visited',
    icon: <BiFoodMenu />,
    desc: 'visited',
  },
  {
    id: 3,
    text: 'Interested',
    enum: 'interested',
    icon: <AiOutlineTable />,
    desc: 'interested',
  },
];
export default preferences;
