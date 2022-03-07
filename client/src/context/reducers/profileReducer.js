import {
  GET_MY_PROFILE_BEGIN,
  GET_MY_PROFILE_SUCCESS,
  GET_USER_PROFILE_BEGIN,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_BEGIN,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_ERROR,
  CLEAR_ALERT,
} from '../actions/profileActions';

const reducer = (state, action) => {
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === GET_MY_PROFILE_BEGIN) {
    return {
      ...state,
      isLoadingProfile: true,
    };
  }
  if (action.type === GET_MY_PROFILE_SUCCESS) {
    return {
      ...state,
      isLoadingProfile: false,
      profile: action.payload.profile,
    };
  }

  if (action.type === GET_USER_PROFILE_BEGIN) {
    return {
      ...state,
      isLoadingProfile: true,
    };
  }

  if (action.type === GET_USER_PROFILE_SUCCESS) {
    return {
      ...state,
      isLoadingProfile: false,
      profile: action.payload.profile,
      totalFollowers: action.payload.totalFollowers,
      totalFollowing: action.payload.totalFollowing,
    };
  }

  if (action.type === UPDATE_USER_PROFILE_BEGIN) {
    return {
      ...state,
      isLoadingProfile: true,
    };
  }
  if (action.type === UPDATE_USER_PROFILE_SUCCESS) {
    return {
      ...state,
      isLoadingProfile: false,
      showProfileAlert: true,
      alertType: 'success',
      alertText: 'Profile Data Updated Successfully!',
    };
  }

  if (action.type === UPDATE_USER_PROFILE_ERROR) {
    return {
      ...state,
      isLoadingProfile: false,
      showProfileAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
