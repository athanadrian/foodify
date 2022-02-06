import { costs, foodys, cuisines } from './lookup-data';

export const cuisineDefaultStats = (stats) => {
  return [
    {
      title: cuisines[0].text,
      count: stats?.greek || 0,
      icon: cuisines[0].icon,
      color: '#1e40af',
      bcg: '#60a5fa',
    },
    {
      title: cuisines[1].text,
      count: stats?.italian || 0,
      icon: cuisines[1].icon,
      color: '#486581',
      bcg: '#54d1db',
    },
    {
      title: cuisines[2].text,
      count: stats?.asian || 0,
      icon: cuisines[2].icon,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: cuisines[3].text,
      count: stats?.mexican || 0,
      icon: cuisines[3].icon,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
  ];
};

export const costDefaultStats = (stats) => {
  return [
    {
      title: costs[0].text,
      count: stats?.cheap || 0,
      icon: `${costs[0].desc} €`,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: costs[1].text,
      count: stats?.average || 0,
      icon: `${costs[1].desc} €€`,
      color: '#486581',
      bcg: '#54d1db',
    },
    {
      title: costs[2].text,
      count: stats?.expensive || 0,
      icon: `${costs[2].desc} €€€`,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];
};

export const foodyDefaultStats = (stats) => {
  return [
    {
      title: foodys[0].text,
      count: stats?.meze || 0,
      icon: foodys[0].icon,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: foodys[1].text,
      count: stats?.alaCarte || 0,
      icon: foodys[1].icon,
      color: '#486581',
      bcg: '#54d1db',
    },
    {
      title: foodys[2].text,
      count: stats?.buffet || 0,
      icon: foodys[2].icon,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];
};
