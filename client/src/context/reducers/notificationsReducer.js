import {
  GET_NOTIFICATIONS_BEGIN,
  GET_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATION_BEGIN,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_ERROR,
  SET_NOTIFICATIONS_TO_READ,
  CLEAR_ALERT,
} from '../actions/notificationsActions';

const reducer = (state, action) => {
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === GET_NOTIFICATIONS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_NOTIFICATIONS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      notifications: action.payload.notifications,
      totalNotifications: action.payload.totalNotifications,
    };
  }

  if (action.type === DELETE_NOTIFICATION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === DELETE_NOTIFICATION_SUCCESS) {
    const remainingNotifications = state.notifications.filter(
      (notification) => notification._id !== action.payload.id
    );
    return {
      ...state,
      notifications: remainingNotifications,
      totalNotifications: remainingNotifications.length,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.msg,
    };
  }
  if (action.type === DELETE_NOTIFICATION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === SET_NOTIFICATIONS_TO_READ) {
    return {
      ...state,
    };
  }

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
