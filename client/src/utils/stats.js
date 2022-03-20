import { costs, types, menus, cuisines } from './lookup-data';

export const cuisineDefaultStats = (stats) => {
  return [
    {
      title: cuisines[0].text,
      enumQuery: cuisines[0].enum,
      category: 'Cuisine',
      count: stats?.greek || 0,
      icon: cuisines[0].icon,
      color: '#0369a1',
      bcg: '#7dd3fc',
    },
    {
      title: cuisines[1].text,
      enumQuery: cuisines[1].enum,
      category: 'Cuisine',
      count: stats?.italian || 0,
      icon: cuisines[1].icon,
      color: '#0f5132',
      bcg: '#d1e7dd',
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
export const typeDefaultStats = (stats) => {
  return [
    {
      title: types[0].text,
      enumQuery: types[0].enum,
      category: 'Type',
      count: stats?.breakfast || 0,
      icon: types[0].icon,
      color: '#0369a1',
      bcg: '#7dd3fc',
    },
    {
      title: types[1].text,
      enumQuery: types[1].enum,
      category: 'Type',
      count: stats?.brunch || 0,
      icon: types[1].icon,
      color: '#0f5132',
      bcg: '#d1e7dd',
    },
    {
      title: types[2].text,
      enumQuery: types[2].enum,
      category: 'Type',
      count: stats?.lunch || 0,
      icon: types[2].icon,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: types[3].text,
      enumQuery: types[3].enum,
      category: 'Type',
      count: stats?.dinner || 0,
      icon: types[3].icon,
      color: '#f0b429',
      bcg: '#fffbea',
    },
    {
      title: types[4].text,
      enumQuery: types[4].enum,
      category: 'Type',
      count: stats?.drink || 0,
      icon: types[4].icon,
      color: '#da4a91',
      bcg: '#ffe0f0',
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
      color: '#f0b429',
      bcg: '#fffbea',
    },
    {
      title: costs[1].text,
      enumQuery: costs[1].enum,
      category: 'Cost',
      count: stats?.average || 0,
      icon: `${costs[1].desc} €€`,
      color: '#0f5132',
      bcg: '#d1e7dd',
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

export const menuDefaultStats = (stats) => {
  return [
    {
      title: menus[0].text,
      enumQuery: menus[0].enum,
      category: 'menu',
      count: stats?.meze || 0,
      icon: menus[0].icon,
      color: '#f0b429',
      bcg: '#fffbea',
    },
    {
      title: menus[1].text,
      enumQuery: menus[1].enum,
      category: 'menu',
      count: stats?.alaCarte || 0,
      icon: menus[1].icon,
      color: '#0f5132',
      bcg: '#d1e7dd',
    },
    {
      title: menus[2].text,
      enumQuery: menus[2].enum,
      category: 'menu',
      count: stats?.buffet || 0,
      icon: menus[2].icon,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];
};
