import { useContext, createContext, useReducer } from 'react';
import useClientApi from 'hooks/useClientApi';
import reducer from '../reducers/appReducer';
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
import useGeoLocation from 'hooks/useGeolocation';
import { MAP_CENTER } from 'utils/constants';

let cancel;
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userFollowStats = localStorage.getItem('userFollowStats');
const homeLocation = localStorage.getItem('home-location');
const home = localStorage.getItem('home-city');

const initialState = {
  isLoading: false,
  isSuccess: false,
  isUsernameAvailable: false,
  showUsernameAlert: false,
  showAlert: false,
  showModal: false,
  showSidebar: false,
  showInfoWindow: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  userFollowStats: userFollowStats ? JSON.parse(userFollowStats) : null,
  token: token,
  homeLocation: JSON.parse(homeLocation) || MAP_CENTER,
  myLocation: null,
  home: home || '',
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const currentLocation = useGeoLocation();
  state.myLocation = currentLocation;

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const toggleModal = () => {
    dispatch({ type: TOGGLE_MODAL });
  };

  const addFollowToUserFollowingStats = (userToFollowId) => {
    dispatch({
      type: ADD_FOLLOW_TO_USER_FOLLOWING_STATS,
      payload: { userToFollowId },
    });
  };
  const removeFollowToUserFollowingStats = (userToUnFollowId) => {
    dispatch({
      type: REMOVE_FOLLOW_FROM_USER_FOLLOWING_STATS,
      payload: { userToUnFollowId },
    });
  };

  const addUserToLocalStorage = ({
    user,
    userFollowStats,
    token,
    location,
    home,
  }) => [
    localStorage.setItem('user', JSON.stringify(user)),
    localStorage.setItem('userFollowStats', JSON.stringify(userFollowStats)),
    localStorage.setItem('token', token),
    localStorage.setItem('home-location', JSON.stringify(location)),
    localStorage.setItem('home-city', home),
  ];

  const removeUserFromLocalStorage = () => [
    localStorage.removeItem('user'),
    localStorage.removeItem('userFollowStats'),
    localStorage.removeItem('token'),
    localStorage.removeItem('home-location'),
    localStorage.removeItem('home-city'),
  ];

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const setUserHomeCurrentLocation = ({ alertText }) => {
    dispatch({ type: SET_USER_HOME_CURRENT_LOCATION, payload: { alertText } });
    clearAlert();
  };

  const setUserHomeLocation = ({ alertText, location }) => {
    dispatch({
      type: SET_USER_HOME_LOCATION,
      payload: { alertText, location },
    });
    clearAlert();
  };

  const setUserNotificationsToRead = async () => {
    dispatch({
      type: SET_USER_NOTIFICATIONS_TO_READ,
    });
  };

  const { clientApi, CancelTokenApi } = useClientApi(logoutUser);

  const checkUsernameAvailability = async (username) => {
    dispatch({ type: CHECK_USERNAME_BEGIN });
    try {
      cancel && cancel();

      const CancelToken = CancelTokenApi;

      const options = {
        cancelToken: new CancelToken((canceler) => {
          cancel = canceler;
        }),
      };
      const { data } = await clientApi.get(`/auth/${username}`, { options });
      const { msg } = data;
      dispatch({ type: CHECK_USERNAME_SUCCESS, payload: { msg } });
    } catch (error) {
      dispatch({
        type: CHECK_USERNAME_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const signUser = async ({ endPoint, currentUser, alertText }) => {
    dispatch({ type: SIGN_USER_BEGIN });
    try {
      const { data } = await clientApi.post(`/auth/${endPoint}`, currentUser);
      const { user, userFollowStats, token, location, home } = data;
      dispatch({
        type: SIGN_USER_SUCCESS,
        payload: { user, userFollowStats, token, location, home, alertText },
      });
      addUserToLocalStorage({ user, userFollowStats, token, location, home });
    } catch (error) {
      dispatch({
        type: SIGN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const forgotPassword = async ({ email, alertText }) => {
    dispatch({ type: FORGOT_PASSWORD_BEGIN });
    try {
      await clientApi.post(`/auth/forgot-password`, { email });

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: { alertText, isSuccess: true },
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const resetPassword = async ({ password, token, alertText }) => {
    dispatch({ type: RESET_PASSWORD_BEGIN });
    try {
      await clientApi.put(`/auth/reset-password/${token}`, { password });

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: { alertText, isSuccess: true },
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const updateUser = async (userToUpdate) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await clientApi.patch('/auth/update-user', userToUpdate);
      const { user, userFollowStats, token, location, home } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, userFollowStats, token, location, home },
      });
      addUserToLocalStorage({ user, userFollowStats, token, location, home });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        signUser,
        forgotPassword,
        resetPassword,
        updateUser,
        toggleSidebar,
        toggleModal,
        logoutUser,
        setUserNotificationsToRead,
        checkUsernameAvailability,
        addFollowToUserFollowingStats,
        removeFollowToUserFollowingStats,
        setUserHomeCurrentLocation,
        setUserHomeLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };
