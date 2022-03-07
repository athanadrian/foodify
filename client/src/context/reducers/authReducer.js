import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  CHECK_USERNAME_BEGIN,
  CHECK_USERNAME_SUCCESS,
  CHECK_USERNAME_ERROR,
} from '../actions/authActions';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showUsernameAlert: true,
      alertUsernameType: 'danger',
      alertUsernameText: 'Please provide all values!',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showUsernameAlert: false,
      alertUsernameType: '',
      alertUsernameText: '',
    };
  }
  if (action.type === CHECK_USERNAME_BEGIN) {
    return {
      ...state,
      isUsernameLoading: true,
    };
  }
  if (action.type === CHECK_USERNAME_SUCCESS) {
    return {
      ...state,
      isUsernameLoading: false,
      isUsernameAvailable: true,
      showUsernameAlert: true,
      alertUsernameType: 'success',
      alertUsernameText: action.payload.msg,
    };
  }
  if (action.type === CHECK_USERNAME_ERROR) {
    return {
      ...state,
      isUsernameLoading: false,
      showUsernameAlert: true,
      alertUsernameType: 'danger',
      alertUsernameText: action.payload.msg,
    };
  }

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
