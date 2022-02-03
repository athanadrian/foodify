import { useEffect } from 'react';
import { FaRegFlag } from 'react-icons/fa';
import { Loading, StatsContainerRow } from '.';
import { useAppContext } from '../context/appContext';

const StatsContainer = ({ all }) => {
  const { getAllStats, getUserStats, isLoading, stats } = useAppContext();
  const { defaultCuisineStats, defaultCostStats } = stats;
  const cuisineStats = [
    {
      title: 'greek',
      count: defaultCuisineStats?.greek || 0,
      icon: <FaRegFlag />,
      color: '#1e40af',
      bcg: '#60a5fa',
    },
    {
      title: 'mexican',
      count: defaultCuisineStats?.mexican || 0,
      icon: <FaRegFlag />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'italian',
      count: defaultCuisineStats?.italian || 0,
      icon: <FaRegFlag />,
      color: '#486581',
      bcg: '#54d1db',
    },
    {
      title: 'asian',
      count: defaultCuisineStats?.asian || 0,
      icon: <FaRegFlag />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  const costStats = [
    {
      title: 'cheap',
      count: defaultCostStats?.cheap || 0,
      icon: '€',
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'average',
      count: defaultCostStats?.average || 0,
      icon: '€€',
      color: '#486581',
      bcg: '#54d1db',
    },
    {
      title: 'expensive',
      count: defaultCostStats?.expensive || 0,
      icon: '€€€',
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];
  useEffect(() => {
    all ? getAllStats() : getUserStats();
    // eslint-disable-next-line
  }, [all]);
  console.log(stats);

  if (isLoading) return <Loading center />;

  return (
    <>
      <StatsContainerRow title='cuisine' list={cuisineStats} />
      <StatsContainerRow title='cost' list={costStats} />
    </>
  );
};

export default StatsContainer;
