import { FoodyModal, Modal } from 'components';
import NotificationsContainer from 'components/NotificationsContainer';
import { useNotificationsContext } from 'context/notificationsContext';
import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';

const Notifications = () => {
  const { getNotifications } = useNotificationsContext();
  const { showModal, toggleModal } = useAppContext();
  useEffect(() => {
    getNotifications();

    // eslint-disable-next-line
  }, []);

  return (
    <div className='dashboard-page'>
      <NotificationsContainer />
      <Modal open={showModal} onClose={toggleModal} center>
        <FoodyModal />
      </Modal>
    </div>
  );
};

export default Notifications;
