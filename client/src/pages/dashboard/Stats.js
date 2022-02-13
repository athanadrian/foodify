import { StatsContainer, ChartsContainer } from '../../components';
import { useAppContext } from '../../context/appContext';

const Stats = () => {
  const { monthlyCreations } = useAppContext();
  return (
    <div className='dashboard-page'>
      <StatsContainer all />
      {monthlyCreations.length > 0 && <ChartsContainer />}
    </div>
  );
};

export default Stats;
