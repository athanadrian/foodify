import { useFoodyContext } from 'context/contexts/foodyContext';
import { useEffect } from 'react';
import { Loading, StatsContainerRow } from '.';
import {
  costDefaultStats,
  cuisineDefaultStats,
  typeDefaultStats,
  menuDefaultStats,
} from 'utils/stats';
import { useParams } from 'react-router-dom';

const StatsContainer = ({ all, profile }) => {
  const { username } = useParams();

  const { getAllStats, getUserStats, isFoodyLoading, stats, clearFilters } =
    useFoodyContext();
  const {
    defaultCuisineStats,
    defaultTypeStats,
    defaultCostStats,
    defaultMenuStats,
  } = stats;

  const cuisineStats = cuisineDefaultStats(defaultCuisineStats);
  const typeStats = typeDefaultStats(defaultTypeStats);
  const costStats = costDefaultStats(defaultCostStats);
  const menuStats = menuDefaultStats(defaultMenuStats);

  useEffect(() => {
    if (all) getAllStats();
    if (profile) getUserStats(username);
    // eslint-disable-next-line
  }, [all, profile, username]);

  useEffect(() => {
    clearFilters();
    // eslint-disable-next-line
  }, []);

  if (isFoodyLoading) return <Loading center max />;

  return (
    <>
      <StatsContainerRow title='cuisine' list={cuisineStats} />
      <StatsContainerRow title='Preferable for' list={typeStats} />
      <StatsContainerRow title='menu' list={menuStats} />
      <StatsContainerRow title='cost' list={costStats} />
    </>
  );
};

export default StatsContainer;
