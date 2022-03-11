import { FoodyModal, Modal } from 'components';
import NotificationsContainer from 'components/NotificationsContainer';
import { useFoodyContext } from 'context/contexts/foodyContext';
import { useNotificationsContext } from 'context/contexts/notificationsContext';
import { useEffect } from 'react';

const Notifications = () => {
  const { getNotifications } = useNotificationsContext();
  const { showModal, toggleModal } = useFoodyContext();
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
