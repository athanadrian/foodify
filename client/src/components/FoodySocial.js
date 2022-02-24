import moment from 'moment';

import { useAppContext } from '../context/appContext';
import Wrapper from '../wrappers/FoodySocial';
import CommentsModal from './CommentsModal';
import LikeButton from './LikeButton';
import VisitButton from './VisitButton';

const FoodySocial = () => {
  const { user, foodyDetail } = useAppContext();
  const { _id, createdBy, likes, visits, comments } = foodyDetail;

  const { name, home, createdAt } = createdBy;
  const registered = moment(createdAt).format('MMM Do YYYY');
  const isLiked = likes.filter((like) => like.user._id === user._id).length > 0;
  const isVisited =
    visits.filter((visit) => visit.user._id === user._id).length > 0;

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{name.charAt(0)}</div>
        <div className='header-items'>
          <div className='info'>
            <h5>
              {name}
              <span className='comment-date'>{registered}</span>
            </h5>
            <p className='comment'>{home}</p>
          </div>
        </div>
      </header>
      <div className='space-between'>
        <LikeButton isLiked={isLiked} foodyId={_id} userId={user._id}>
          <span>Like</span>
        </LikeButton>
        <VisitButton isVisited={isVisited} foodyId={_id} userId={user._id}>
          <span>Visit</span>
        </VisitButton>
      </div>
      {/* <div className='content'>
        <div className='content-center'> */}
      <CommentsModal foodyId={_id} comments={comments} />
      {/* </div> 
        <footer></footer>
      </div>*/}
    </Wrapper>
  );
};
export default FoodySocial;
