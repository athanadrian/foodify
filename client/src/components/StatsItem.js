import { Link } from 'react-router-dom';
import Wrapper from 'wrappers/StatsItem';

const StatItem = ({
  stat,
  count,
  title,
  enumQuery,
  category,
  icon,
  color,
  bcg,
}) => {
  const isCost = stat === 'cost';
  const noLink = count === 0;

  const renderStatItem = () => (
    <>
      <header>
        <span className='count'>{count}</span>
        <span className={`${isCost ? 'cost-' : ''}icon`}>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </>
  );
  const stateData = {
    enumQuery,
    category,
  };

  return (
    <Wrapper color={color} bcg={bcg}>
      {noLink ? (
        renderStatItem()
      ) : (
        <Link to='all-foodys' state={stateData} className='stat-link'>
          {renderStatItem()}
        </Link>
      )}
    </Wrapper>
  );
};

export default StatItem;
