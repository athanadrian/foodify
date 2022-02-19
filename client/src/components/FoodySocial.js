import moment from 'moment';

import { useAppContext } from '../context/appContext';
import Wrapper from '../wrappers/FoodySocial';
import LikeButton from './LikeButton';

const FoodySocial = () => {
  const { user, foodyDetail } = useAppContext();
  const { _id, createdBy, likes } = foodyDetail;

  const { name, home, createdAt } = createdBy;
  const registered = moment(createdAt).format('MMM Do YYYY');
  const isLiked = likes.filter((like) => like.user._id === user._id).length > 0;

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{name.charAt(0)}</div>
        <div className='header-items'>
          <div className='info'>
            <h4>{name}</h4>
            <h5>{registered}</h5>
            <p>{home}</p>
          </div>
        </div>
      </header>
      <LikeButton isLiked={isLiked} foodyId={_id} userId={user._id}>
        <span>Like</span>
      </LikeButton>
      <div className='content'>
        <div className='content-center'></div>
        <footer></footer>
      </div>
    </Wrapper>
  );
};
export default FoodySocial;
