import { useContext, createContext, useReducer } from 'react';
import useClientApi from 'hooks/useClientApi';
import reducer from '../reducers/profileReducer';
import {
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
  CLEAR_ALERT,
  MARK_CLICKED_ELEMENT,
} from '../actions/profileActions';
import { useAppContext } from 'context/contexts/appContext';

const initialState = {
  isLoadingProfile: false,
  isLoadingFollowers: false,
  isLoadingFollowing: false,
  showProfileAlert: false,
  isFollowing: false,
  isFollow: false,
  isUnFollow: false,
  isFetching: false,
  markedElementId: '',
  alertType: '',
  alertText: '',
  profile: {},
  followers: [],
  following: [],
};
const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { addFollowToUserFollowingStats, removeFollowToUserFollowingStats } =
    useAppContext();

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const clickedElement = (markedElementId) => {
    dispatch({ type: MARK_CLICKED_ELEMENT, payload: { markedElementId } });
  };

  const { clientApi } = useClientApi();

  const getMyProfile = async () => {
    dispatch({ type: GET_MY_PROFILE_BEGIN });
    try {
      const { data } = await clientApi.post('/profile/me');
      const { profile } = data;
      dispatch({ type: GET_MY_PROFILE_SUCCESS, payload: { profile } });
    } catch (error) {
      console.log('😱 Error Get My Profile: ', error.response.data.msg);
    }
  };

  const getUserProfile = async (username) => {
    dispatch({ type: GET_USER_PROFILE_BEGIN });
    try {
      const { data } = await clientApi.get(`/profile/${username}`);
      const {
        profile,
        totalCreations,
        totalComments,
        totalLikes,
        totalVisits,
        totalFollowers,
        totalFollowing,
      } = data;
      dispatch({
        type: GET_USER_PROFILE_SUCCESS,
        payload: {
          profile,
          totalCreations,
          totalComments,
          totalLikes,
          totalVisits,
          totalFollowers,
          totalFollowing,
        },
      });
    } catch (error) {
      console.log('😱 Error Get User Profile: ', error.response.data.msg);
    }
  };

  const updateProfile = async (profileToUpdate) => {
    dispatch({ type: UPDATE_MY_PROFILE_BEGIN });
    try {
      const { data } = await clientApi.post('/profile/update', profileToUpdate);
      const { profile } = data;
      dispatch({
        type: UPDATE_MY_PROFILE_SUCCESS,
        payload: { profile },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_MY_PROFILE_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const getUserFollowers = async (userId) => {
    dispatch({ type: GET_FOLLOWERS_BEGIN });
    try {
      const { data } = await clientApi.get(`/profile/followers/${userId}`);
      dispatch({ type: GET_FOLLOWERS_SUCCESS, payload: { followers: data } });
    } catch (error) {
      console.log('😱 Error Follower user: ', error.response.data);
    }
  };

  const getUserFollowing = async (userId) => {
    dispatch({ type: GET_FOLLOWING_BEGIN });
    try {
      const { data } = await clientApi.get(`/profile/following/${userId}`);
      dispatch({ type: GET_FOLLOWING_SUCCESS, payload: { following: data } });
    } catch (error) {
      console.log('😱 Error Following user: ', error.response.data);
    }
  };

  const followUser = async (userToFollowId) => {
    dispatch({ type: FOLLOW_USER_BEGIN });
    try {
      await clientApi.post(`/profile/follow/${userToFollowId}`);
      addFollowToUserFollowingStats(userToFollowId);
      dispatch({ type: FOLLOW_USER_SUCCESS, payload: { userToFollowId } });
    } catch (error) {
      dispatch({
        type: FOLLOW_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log('😱 Error Follow user: ', error.response.data);
    }
  };

  const unFollowUser = async (userToUnFollowId) => {
    dispatch({ type: UN_FOLLOW_USER_BEGIN });
    try {
      await clientApi.put(`/profile/un-follow/${userToUnFollowId}`);
      removeFollowToUserFollowingStats(userToUnFollowId);
      dispatch({ type: UN_FOLLOW_USER_SUCCESS, payload: { userToUnFollowId } });
    } catch (error) {
      dispatch({
        type: UN_FOLLOW_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log('😱 Error UnFollow user: ', error.response.data);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        getMyProfile,
        getUserProfile,
        updateProfile,
        followUser,
        unFollowUser,
        getUserFollowers,
        getUserFollowing,
        clickedElement,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

const useProfileContext = () => {
  return useContext(ProfileContext);
};

export { ProfileProvider, useProfileContext };
