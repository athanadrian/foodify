import { IoTrashOutline } from 'react-icons/io5';
import { relativeDate } from 'utils/functions';
import { useNotificationsContext } from 'context/contexts/notificationsContext';
import { AiOutlineComment } from 'react-icons/ai';
import { FoodyLink } from './FoodyLink';
import { UserLink } from './UserLink';

const CommentNotification = ({ notification }) => {
  const { deleteNotification } = useNotificationsContext();
  const {
    _id,
    fromUser: { name, username },
    foody: { title, slug },
    text,
    date,
  } = notification;

  return (
    <div className='notification-container'>
      <div className='profile-icon'>{name.charAt(0)}</div>
      <div className='profile-info'>
        <div className='info-container'>
          <h5>
            <AiOutlineComment className='comment' size={14} />
            <span className='notification-text'> User </span>
            <UserLink name={name} username={username} />
            <span className='notification-text'>
              {' '}
              <span className='comment'>commented</span> on your Foody
            </span>{' '}
            <FoodyLink title={title} slug={slug} />,{' '}
            <span className='notification-text date'>
              {' '}
              {relativeDate(date)}
            </span>
          </h5>
          <p className='comment'>{text}</p>
        </div>
        <span
          title='Delete comment'
          className='comment-delete-btn'
          onClick={() => deleteNotification(_id)}
        >
          <IoTrashOutline size={20} />
        </span>
      </div>
    </div>
  );
};

export default CommentNotification;
