import Wrapper from '../wrappers/StatsItem';

const StatItem = ({ stat, count, title, icon, color, bcg }) => {
  const isCost = stat === 'cost';
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <span className={`${isCost ? 'cost-' : ''}icon`}>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
