import { useFoodyContext } from 'context/contexts/foodyContext';
import { useEffect } from 'react';
import { Loading, StatsContainerRow } from '.';
import {
  costDefaultStats,
  cuisineDefaultStats,
  typeDefaultStats,
  foodyDefaultStats,
} from 'utils/stats';

const StatsContainer = ({ all }) => {
  const { getAllStats, getUserStats, isFoodyLoading, stats, clearFilters } =
    useFoodyContext();
  const {
    defaultCuisineStats,
    defaultTypeStats,
    defaultCostStats,
    defaultFoodyStats,
  } = stats;

  const cuisineStats = cuisineDefaultStats(defaultCuisineStats);
  const typeStats = typeDefaultStats(defaultTypeStats);
  const costStats = costDefaultStats(defaultCostStats);
  const foodyStats = foodyDefaultStats(defaultFoodyStats);

  useEffect(() => {
    all ? getAllStats() : getUserStats();
    // eslint-disable-next-line
  }, [all]);

  useEffect(() => {
    clearFilters();

    // eslint-disable-next-line
  }, []);
  if (isFoodyLoading) return <Loading center max />;

  return (
    <>
      <StatsContainerRow title='cuisine' list={cuisineStats} />
      <StatsContainerRow title='Preferable' list={typeStats} />
      <StatsContainerRow title='foody' list={foodyStats} />
      <StatsContainerRow title='cost' list={costStats} />
    </>
  );
};

export default StatsContainer;
