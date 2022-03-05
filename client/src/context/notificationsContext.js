import { useContext, createContext, useReducer } from 'react';
import useClientApi from '../hooks/useClientApi';
import reducer from './reducers/notificationsReducer';
import {
  GET_NOTIFICATIONS_BEGIN,
  GET_NOTIFICATIONS_SUCCESS,
  //GET_NOTIFICATIONS_ERROR,
  DELETE_NOTIFICATION_BEGIN,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_ERROR,
  //SET_NOTIFICATIONS_TO_READ,
  CLEAR_ALERT,
} from './actions/notificationsActions';
import { useAppContext } from './appContext';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  page: 1,
  numOfPages: 1,
  notifications: [],
  totalNotifications: 0,
  //unreadNotification: false,
};

const NotificationsContext = createContext();

const NotificationsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { clientApi } = useClientApi();

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // const displayAlert = () => {
  //   dispatch({ type: DISPLAY_ALERT });
  //   clearAlert();
  // };

  const getNotifications = async () => {
    dispatch({ type: GET_NOTIFICATIONS_BEGIN });
    try {
      const { data } = await clientApi.get(`/notifications`);
      const { totalNotifications, notifications } = data;
      dispatch({
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: { totalNotifications, notifications },
      });
    } catch (error) {
      console.log('Set Notifications error: ', error.response.data);
      //clearAlert();
      // dispatch({
      //   type: GET_NOTIFICATIONS_ERROR,
      //   payload: { msg: error.response.data.msg },
      // });
    }
    clearAlert();
  };

  const deleteNotification = async (notificationId) => {
    dispatch({ type: DELETE_NOTIFICATION_BEGIN });
    try {
      const { data } = await clientApi.delete(
        `/notifications/${notificationId}`
      );
      dispatch({
        type: DELETE_NOTIFICATION_SUCCESS,
        payload: { id: notificationId, msg: data.msg },
      });
    } catch (error) {
      dispatch({
        type: DELETE_NOTIFICATION_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // const setNotificationsToRead = async () => {
  //   try {
  //     await clientApi.post('/notifications');
  //     dispatch({
  //       type: SET_NOTIFICATIONS_TO_READ,
  //     });
  //   } catch (error) {
  //     console.log('Set Notifications error: ', error.response.data);
  //     clearAlert();
  //   }
  // };

  return (
    <NotificationsContext.Provider
      value={{
        ...state,
        getNotifications,
        deleteNotification,
        // setNotificationsToRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

const useNotificationsContext = () => {
  return useContext(NotificationsContext);
};

export { NotificationsProvider, useNotificationsContext, initialState };
