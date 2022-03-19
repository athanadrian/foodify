import {
  CLEAR_ALERT,
  GET_MY_PROFILE_BEGIN,
  GET_MY_PROFILE_SUCCESS,
  GET_USER_PROFILE_BEGIN,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_MY_PROFILE_BEGIN,
  UPDATE_MY_PROFILE_SUCCESS,
  UPDATE_MY_PROFILE_ERROR,
  FOLLOW_USER_BEGIN,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_ERROR,
  UN_FOLLOW_USER_BEGIN,
  UN_FOLLOW_USER_SUCCESS,
  UN_FOLLOW_USER_ERROR,
  GET_FOLLOWERS_BEGIN,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWING_BEGIN,
  GET_FOLLOWING_SUCCESS,
  MARK_CLICKED_ELEMENT,
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
      totalCreations: action.payload.totalCreations,
      totalComments: action.payload.totalComments,
      totalLikes: action.payload.totalLikes,
      totalVisits: action.payload.totalVisits,
    };
  }

  if (action.type === GET_FOLLOWERS_BEGIN) {
    return {
      ...state,
      isLoadingFollowers: true,
    };
  }
  if (action.type === GET_FOLLOWERS_SUCCESS) {
    return {
      ...state,
      isLoadingFollowers: false,
      followers: action.payload.followers,
    };
  }
  if (action.type === GET_FOLLOWING_BEGIN) {
    return {
      ...state,
      isLoadingFollowing: true,
    };
  }
  if (action.type === GET_FOLLOWING_SUCCESS) {
    return {
      ...state,
      isLoadingFollowing: false,
      following: action.payload.following,
    };
  }

  if (action.type === UPDATE_MY_PROFILE_BEGIN) {
    return {
      ...state,
      isLoadingProfile: true,
    };
  }

  if (action.type === UPDATE_MY_PROFILE_SUCCESS) {
    return {
      ...state,
      isLoadingProfile: false,
      showProfileAlert: true,
      alertType: 'success',
      alertText: 'Profile Data Updated Successfully!',
    };
  }

  if (action.type === UPDATE_MY_PROFILE_ERROR) {
    return {
      ...state,
      isLoadingProfile: false,
      showProfileAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === FOLLOW_USER_BEGIN) {
    return {
      ...state,
      isFollowing: true,
    };
  }
  if (action.type === FOLLOW_USER_SUCCESS) {
    return {
      ...state,
      isFollow: true,
      isFollowing: false,
    };
  }
  if (action.type === FOLLOW_USER_ERROR) {
    return {
      ...state,
      alertType: 'danger',
      alertText: action.payload.msg,
      showProfileAlert: true,
      isFollowing: false,
    };
  }
  if (action.type === UN_FOLLOW_USER_BEGIN) {
    return {
      ...state,
      isFollowing: true,
    };
  }

  if (action.type === UN_FOLLOW_USER_SUCCESS) {
    return {
      ...state,
      isUnFollow: true,
      isFollowing: false,
    };
  }

  if (action.type === UN_FOLLOW_USER_ERROR) {
    return {
      ...state,
      alertType: 'danger',
      alertText: action.payload.msg,
      showProfileAlert: true,
      isFollowing: false,
    };
  }

  if (action.type === MARK_CLICKED_ELEMENT) {
    return {
      ...state,
      markedElementId: action.payload.markedElementId,
    };
  }

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
