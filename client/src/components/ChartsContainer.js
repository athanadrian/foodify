import { useState } from 'react';
import { useAppContext } from 'context/contexts/appContext';
import Wrapper from 'wrappers/ChartsContainer';
import AreaChart from './AreaChart';
import BarChart from './BarChart';

const ChartsContainer = () => {
  const { monthlyCreations: data } = useAppContext();
  const [showAreaChart, setAreaChart] = useState(false);
  return (
    <Wrapper>
      <h4>Monthly Creations</h4>
      <button type='button' onClick={() => setAreaChart(!showAreaChart)}>
        {showAreaChart ? 'Bar Chart' : 'Area Chart'}
      </button>
      {showAreaChart ? <AreaChart data={data} /> : <BarChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
