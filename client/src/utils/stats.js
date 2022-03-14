import { costs, foodys, cuisines } from './lookup-data';

export const cuisineDefaultStats = (stats) => {
  return [
    {
      title: cuisines[0].text,
      enumQuery: cuisines[0].enum,
      category: 'Cuisine',
      count: stats?.greek || 1,
      icon: cuisines[0].icon,
      color: '#1e40af',
      bcg: '#60a5fa',
    },
    {
      title: cuisines[1].text,
      enumQuery: cuisines[1].enum,
      category: 'Cuisine',
      count: stats?.italian || 0,
      icon: cuisines[1].icon,
      color: '#486581',
      bcg: '#54d1db',
    },
    {
      title: cuisines[2].text,
      enumQuery: cuisines[2].enum,
      category: 'Cuisine',
      count: stats?.asian || 0,
      icon: cuisines[2].icon,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: cuisines[3].text,
      enumQuery: cuisines[3].enum,
      category: 'Cuisine',
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
      enumQuery: costs[0].enum,
      category: 'Cost',
      count: stats?.cheap || 0,
      icon: `${costs[0].desc} €`,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: costs[1].text,
      enumQuery: costs[1].enum,
      category: 'Cost',
      count: stats?.average || 0,
      icon: `${costs[1].desc} €€`,
      color: '#486581',
      bcg: '#54d1db',
    },
    {
      title: costs[2].text,
      enumQuery: costs[2].enum,
      category: 'Cost',
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
      enumQuery: foodys[0].enum,
      category: 'Foody',
      count: stats?.meze || 0,
      icon: foodys[0].icon,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: foodys[1].text,
      enumQuery: foodys[1].enum,
      category: 'Foody',
      count: stats?.alaCarte || 0,
      icon: foodys[1].icon,
      color: '#486581',
      bcg: '#54d1db',
    },
    {
      title: foodys[2].text,
      enumQuery: foodys[2].enum,
      category: 'Foody',
      count: stats?.buffet || 0,
      icon: foodys[2].icon,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];
};
