import moment from 'moment';
import { FaHeart } from 'react-icons/fa';
import { Alert } from '.';

import { useAppContext } from '../context/appContext';
import Wrapper from '../wrappers/FoodySocial';

const FoodySocial = () => {
  const { user, foodyDetail, likeUnlikeFoody, showAlert } = useAppContext();
  const { _id, createdBy, likes } = foodyDetail;

  const { name, home, createdAt } = createdBy;
  const registered = moment(createdAt).format('MMM Do YYYY');
  const isLiked = likes.filter((like) => like.user._id === user._id).length > 0;
  const handleLike = () => {
    likeUnlikeFoody({
      like: true,
      foodyId: _id,
      userId: user._id,
      alertText: 'LIKED',
    });
  };
  const handleUnlike = () => {
    likeUnlikeFoody({
      like: false,
      foodyId: _id,
      userId: user._id,
      alertText: 'UNLIKED',
    });
  };

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
      <div className={`${isLiked ? 'like-container liked' : 'like-container'}`}>
        <div className='center'>
          <span
            className='center'
            onClick={isLiked ? handleUnlike : handleLike}
          >
            <FaHeart />
          </span>
          <span>Like</span>
        </div>
        <div>{showAlert && <Alert />}</div>
      </div>
      <div className='content'>
        <div className='content-center'></div>
        <footer></footer>
      </div>
    </Wrapper>
  );
};
export default FoodySocial;
