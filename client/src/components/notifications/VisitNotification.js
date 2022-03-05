import { IoTrashOutline } from 'react-icons/io5';
import { relativeDate } from 'utils/functions';
import { useNotificationsContext } from 'context/notificationsContext';
import { BsBookmarkPlusFill } from 'react-icons/bs';

const VisitNotification = ({ notification }) => {
  const { deleteNotification } = useNotificationsContext();

  const {
    _id,
    fromUser: { name },
    foody: { title },
    date,
  } = notification;

  return (
    <div className='notification-container'>
      <div className='profile-icon'>{name.charAt(0)}</div>
      <div className='profile-info'>
        <div className='info-container'>
          <h5>
            <BsBookmarkPlusFill className='visit' size={12} />
            <span className='notification-text'> User </span>
            <span className='user'> {name}</span>{' '}
            <span className='notification-text'>
              mentioned that <span className='visit'>visited</span> your Foody
            </span>{' '}
            <span className='foody'> {title}</span>,{' '}
            <span className='notification-text date'>
              {' '}
              {relativeDate(date)}
            </span>
          </h5>
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

export default VisitNotification;
