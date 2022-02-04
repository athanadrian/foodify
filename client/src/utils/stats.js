import { FaRegFlag } from 'react-icons/fa';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { BiFoodMenu } from 'react-icons/bi';
import { AiOutlineTable } from 'react-icons/ai';

import costsEnum from './costs';

export const cuisineDefaultStats = (stats) => {
  return [
    {
      title: 'greek',
      count: stats?.greek || 0,
      icon: <FaRegFlag />,
      color: '#1e40af',
      bcg: '#60a5fa',
    },
    {
      title: 'mexican',
      count: stats?.mexican || 0,
      icon: <FaRegFlag />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'italian',
      count: stats?.italian || 0,
      icon: <FaRegFlag />,
      color: '#486581',
      bcg: '#54d1db',
    },
    {
      title: 'asian',
      count: stats?.asian || 0,
      icon: <FaRegFlag />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];
};

export const costDefaultStats = (stats) => {
  return [
    {
      title: 'cheap',
      count: stats?.cheap || 0,
      icon: `${costsEnum[0].desc} €`,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'average',
      count: stats?.average || 0,
      icon: `${costsEnum[1].desc} €€`,
      color: '#486581',
      bcg: '#54d1db',
    },
    {
      title: 'expensive',
      count: stats?.expensive || 0,
      icon: `${costsEnum[2].desc} €€€`,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];
};

export const foodyDefaultStats = (stats) => {
  return [
    {
      title: 'meze',
      count: stats?.meze || 0,
      icon: <MdOutlineRestaurantMenu />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'al a carte',
      count: stats?.alaCarte || 0,
      icon: <BiFoodMenu />,
      color: '#486581',
      bcg: '#54d1db',
    },
    {
      title: 'buffet',
      count: stats?.buffet || 0,
      icon: <AiOutlineTable />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];
};
