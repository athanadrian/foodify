import { useContext, createContext, useReducer } from 'react';
import useClientApi from '../../hooks/useClientApi';
import reducer from '../reducers/profileReducer';
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

const initialState = {
  isLoadingProfile: false,
  showProfileAlert: false,
  alertType: '',
  alertText: '',
  profile: {},
};
const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const { clientApi } = useClientApi();

  const getMyProfile = async () => {
    dispatch({ type: GET_MY_PROFILE_BEGIN });
    try {
      const { data } = await clientApi.post('/profile/me');
      const { profile } = data;
      dispatch({ type: GET_MY_PROFILE_SUCCESS, payload: { profile } });
    } catch (error) {
      console.log('Get My Profile Error: ', error.response.data.msg);
    }
  };

  const getUserProfile = async (username) => {
    dispatch({ type: GET_USER_PROFILE_BEGIN });
    try {
      const { data } = await clientApi.post(`/profile/${username}`);
      const { profile, totalFollowers, totalFollowing } = data;
      dispatch({
        type: GET_USER_PROFILE_SUCCESS,
        payload: { profile, totalFollowers, totalFollowing },
      });
    } catch (error) {
      console.log('Get User Profile Error: ', error.response.data.msg);
    }
  };

  const updateProfile = async (profileToUpdate) => {
    dispatch({ type: UPDATE_USER_PROFILE_BEGIN });
    try {
      const { data } = await clientApi.post('/profile/update', profileToUpdate);
      const { profile } = data;
      dispatch({
        type: UPDATE_USER_PROFILE_SUCCESS,
        payload: { profile },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_PROFILE_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        getMyProfile,
        getUserProfile,
        updateProfile,
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
