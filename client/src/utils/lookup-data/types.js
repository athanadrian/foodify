import { BiDrink } from 'react-icons/bi';
import {
  MdOutlineBreakfastDining,
  MdOutlineBrunchDining,
  MdOutlineDinnerDining,
  MdOutlineLunchDining,
} from 'react-icons/md';

const types = [
  {
    id: 1,
    text: 'Breakfast',
    enum: 'breakfast',
    icon: <MdOutlineBreakfastDining size={20} />,
    desc: 'breakfast',
  },
  {
    id: 2,
    text: 'Brunch',
    enum: 'brunch',
    icon: <MdOutlineBrunchDining />,
    desc: 'brunch',
  },
  {
    id: 3,
    text: 'Lunch',
    enum: 'lunch',
    icon: <MdOutlineLunchDining size={20} />,
    desc: 'lunch',
  },
  {
    id: 4,
    text: 'Dinner',
    enum: 'dinner',
    icon: <MdOutlineDinnerDining />,
    desc: 'dinner',
  },
  {
    id: 5,
    text: 'Drink',
    enum: 'drink',
    icon: <BiDrink />,
    desc: 'drink',
  },
];
export default types;
