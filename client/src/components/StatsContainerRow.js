import Wrapper from '../wrappers/StatsContainer';
import StatsItem from './StatsItem';

const StatsContainerRow = ({ title, list }) => {
  return (
    <Wrapper>
      <h3>{title}</h3>
      <div className='container-row'>
        {list.map((item, i) => (
          <StatsItem key={i} {...item} />
        ))}
      </div>
    </Wrapper>
  );
};
export default StatsContainerRow;
