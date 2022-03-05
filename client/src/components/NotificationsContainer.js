import { useNotificationsContext } from 'context/notificationsContext';
import { Fragment, useEffect } from 'react';
import { Loading } from '../components';
import { useAppContext } from '../context/appContext';
import Wrapper from '../wrappers/NotificationsContainer';
import { FormButton } from './form-elements';
import PaginationContainer from './PaginationContainer';
import Alert from './Alert';
import CommentNotification from './notifications/CommentNotification';
import LikeNotification from './notifications/LikeNotification';
import VisitNotification from './notifications/VisitNotification';

const NotificationsContainer = () => {
  const { setUserNotificationsToRead } = useAppContext();
  const {
    isLoading,
    alertType,
    alertText,
    showAlert,
    notifications,
    totalNotifications,
    numOfPages,
  } = useNotificationsContext();
  useEffect(() => {
    setUserNotificationsToRead();

    // eslint-disable-next-line
  }, []);

  console.log('notifications', notifications);
  if (isLoading) return <Loading center />;

  if (totalNotifications === 0)
    return (
      <Wrapper>
        <h2> No notifications to display.</h2>
      </Wrapper>
    );

  return (
    <>
      <Wrapper>
        <h5>
          {totalNotifications} notification{notifications.length > 1 && 's'}{' '}
          found
        </h5>
        {showAlert && <Alert type={alertType} text={alertText} />}
        <div className='foodys'>
          {notifications.map((notification) => (
            <Fragment key={notification._id}>
              {notification.type === 'newComment' &&
                notification.foody !== null && (
                  <CommentNotification notification={notification} />
                )}
              {notification.type === 'newLike' &&
                notification.foody !== null && (
                  <LikeNotification notification={notification} />
                )}
              {notification.type === 'newVisit' &&
                notification.foody !== null && (
                  <VisitNotification notification={notification} />
                )}
            </Fragment>
          ))}
        </div>
        {numOfPages > 1 && <PaginationContainer />}
      </Wrapper>
    </>
  );
};

export default NotificationsContainer;
