import { useEffect } from 'react';
import { Loading, StatsContainerRow } from '.';
import { useAppContext } from '../context/appContext';
import {
  costDefaultStats,
  cuisineDefaultStats,
  foodyDefaultStats,
} from '../utils/stats';

const StatsContainer = ({ all }) => {
  const { getAllStats, getUserStats, isLoading, stats } = useAppContext();
  const { defaultCuisineStats, defaultCostStats, defaultFoodyStats } = stats;

  const cuisineStats = cuisineDefaultStats(defaultCuisineStats);
  const costStats = costDefaultStats(defaultCostStats);
  const foodyStats = foodyDefaultStats(defaultFoodyStats);

  useEffect(() => {
    all ? getAllStats() : getUserStats();
    // eslint-disable-next-line
  }, [all]);

  if (isLoading) return <Loading center />;

  return (
    <>
      <StatsContainerRow title='cuisine' list={cuisineStats} />
      <StatsContainerRow title='foody' list={foodyStats} />
      <StatsContainerRow title='cost' list={costStats} />
    </>
  );
};

export default StatsContainer;
