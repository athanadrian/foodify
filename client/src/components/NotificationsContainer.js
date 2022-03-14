import { Fragment, useEffect } from 'react';
import { useNotificationsContext } from 'context/contexts/notificationsContext';
import { Loading } from 'components';
import Wrapper from 'wrappers/NotificationsContainer';
import PaginationContainer from './PaginationContainer';
import Alert from './Alert';
import CommentNotification from './notifications/CommentNotification';
import LikeNotification from './notifications/LikeNotification';
import VisitNotification from './notifications/VisitNotification';
import FollowNotification from './notifications/FollowNotification';
import { useFoodyContext } from 'context/contexts/foodyContext';
import { NoNotifications } from './NoData';

const NotificationsContainer = () => {
  const { getMyFoodys } = useFoodyContext();
  const { setNotificationsToRead } = useNotificationsContext();

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
    getMyFoodys();
    setNotificationsToRead();

    // eslint-disable-next-line
  }, []);

  if (isLoading) return <Loading center max />;

  if (totalNotifications === 0) return <NoNotifications />;

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
              {notification.type === 'newFollower' && (
                <FollowNotification notification={notification} />
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
