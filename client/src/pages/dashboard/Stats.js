import { StatsContainer, ChartsContainer } from '../../components';
import { useAppContext } from '../../context/appContext';

const Stats = () => {
  const { monthlyCreations } = useAppContext();
  return (
    <>
      <StatsContainer all />
      {monthlyCreations.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
