import { useFoodyContext } from 'context/contexts/foodyContext';
import { BsBookmarkPlusFill } from 'react-icons/bs';
import Loading from '../Loading';

const VisitButton = ({ foodyId, userId, children, isVisited, size = 18 }) => {
  const { isVisiting, visitUnVisitFoody } = useFoodyContext();

  const handleVisit = () => {
    visitUnVisitFoody({
      visit: true,
      foodyId: foodyId,
      userId: userId,
    });
  };
  const handleUnVisit = () => {
    visitUnVisitFoody({
      visit: false,
      foodyId: foodyId,
      userId: userId,
    });
  };
  const toggleVisit = () => {
    return isVisited ? handleUnVisit() : handleVisit();
  };
  return (
    <div
      className={`${isVisited ? 'visit-container visited' : 'visit-container'}`}
    >
      <div className='center'>
        {isVisiting ? (
          <span className='center'>
            <Loading min />
          </span>
        ) : (
          <span
            title='I have visited it!'
            className='center'
            onClick={toggleVisit}
          >
            <BsBookmarkPlusFill size={size} />
          </span>
        )}
        {children}
      </div>
    </div>
  );
};

export default VisitButton;
