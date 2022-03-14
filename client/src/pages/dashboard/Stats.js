import { useFoodyContext } from 'context/contexts/foodyContext';
import { StatsContainer, ChartsContainer } from 'components';

const Stats = () => {
  const { monthlyCreations } = useFoodyContext();

  return (
    <div className='dashboard-page'>
      <StatsContainer all />
      {monthlyCreations.length > 0 && <ChartsContainer />}
    </div>
  );
};

export default Stats;
