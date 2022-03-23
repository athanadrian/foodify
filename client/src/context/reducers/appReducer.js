import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  TOGGLE_MODAL,
  TOGGLE_SIDEBAR,
  CHECK_USERNAME_BEGIN,
  CHECK_USERNAME_SUCCESS,
  CHECK_USERNAME_ERROR,
  SIGN_USER_BEGIN,
  SIGN_USER_SUCCESS,
  SIGN_USER_ERROR,
  FORGOT_PASSWORD_BEGIN,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  SET_USER_HOME_CURRENT_LOCATION,
  SET_USER_HOME_LOCATION,
  SET_USER_NOTIFICATIONS_TO_READ,
  ADD_FOLLOW_TO_USER_FOLLOWING_STATS,
  REMOVE_FOLLOW_FROM_USER_FOLLOWING_STATS,
} from '../actions/appActions';

import { initialState } from '../contexts/appContext';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === ADD_FOLLOW_TO_USER_FOLLOWING_STATS) {
    const userFollowStats = {
      ...state.userFollowStats,
      following: [
        { user: action.payload.userToFollowId },
        ...state.userFollowStats.following,
      ],
    };
    return {
      ...state,
      userFollowStats,
    };
  }

  if (action.type === REMOVE_FOLLOW_FROM_USER_FOLLOWING_STATS) {
    const userFollowStats = {
      ...state.userFollowStats,
      following: state.userFollowStats.following.filter(
        (following) => following.user !== action.payload.userToUnFollowId
      ),
    };
    return {
      ...state,
      userFollowStats,
    };
  }
  if (action.type === CHECK_USERNAME_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CHECK_USERNAME_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isUsernameAvailable: true,
      showUsernameAlert: false,
    };
  }
  if (action.type === CHECK_USERNAME_ERROR) {
    return {
      ...state,
      isUsernameAvailable: false,
      showUsernameAlert: true,
      isLoading: false,
      alertText: action.payload.msg,
    };
  }
  if (action.type === SIGN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SIGN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userFollowStats: action.payload.userFollowStats,
      homeLocation: action.payload.location,
      home: action.payload.home,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SIGN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === FORGOT_PASSWORD_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === FORGOT_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }
  if (action.type === FORGOT_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === RESET_PASSWORD_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === RESET_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }
  if (action.type === RESET_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === SET_USER_HOME_CURRENT_LOCATION) {
    return {
      ...state,
      homeLocation: {
        lat: state.myLocation.coordinates.lat,
        lng: state.myLocation.coordinates.lng,
      },
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SET_USER_HOME_LOCATION) {
    return {
      ...state,
      homeLocation: {
        lat: action.payload.location.lat,
        lng: action.payload.location.lng,
      },
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }

  if (action.type === SET_USER_NOTIFICATIONS_TO_READ) {
    return {
      ...state,
      user: { ...state.user, unreadNotification: false },
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === TOGGLE_MODAL) {
    return {
      ...state,
      showModal: !state.showModal,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      homeLocation: null,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userFollowStats: action.payload.userFollowStats,
      homeLocation: action.payload.location,
      home: action.payload.home,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Data successfully updated',
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
