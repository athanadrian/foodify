import { useContext, createContext, useReducer } from 'react';
import useClientApi from '../hooks/useClientApi';
import reducer from './reducers/reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  TOGGLE_MODAL,
  CLOSE_INFO_WINDOW,
  OPEN_INFO_WINDOW,
  TOGGLE_SIDEBAR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  GET_GOOGLE_API_KEY,
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
  SET_USER_CURRENT_LOCATION,
  SET_USER_NOTIFICATIONS_TO_READ,
  ADD_FOODY_BEGIN,
  ADD_FOODY_SUCCESS,
  ADD_FOODY_ERROR,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_FOODYS_BEGIN,
  GET_FOODYS_SUCCESS,
  SET_FOODYS_ORIGIN,
  SET_EDIT_FOODY,
  GET_FOODY_DETAIL,
  GET_FOODY_LIKES_BEGIN,
  GET_FOODY_LIKES_SUCCESS,
  GET_FOODY_LIKES_ERROR,
  LIKE_FOODY,
  UNLIKE_FOODY,
  VISIT_FOODY,
  UN_VISIT_FOODY,
  UPDATE_FOODY_BEGIN,
  UPDATE_FOODY_SUCCESS,
  UPDATE_FOODY_ERROR,
  DELETE_FOODY_BEGIN,
  DELETE_FOODY_SUCCESS,
  DELETE_FOODY_ERROR,
  CHANGE_FOODY_STATUS,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  ADD_FOODY_MARKER,
  ADD_USER_MARKER,
  SET_FOODY_CURRENT_LOCATION,
} from './actions/actions';
import { costs, cuisines, foodys, statuses } from '../utils/lookup-data';
import useGeoLocation from '../hooks/useGeolocation';
import { MAP_CENTER } from '../utils/constants';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const homeLocation = localStorage.getItem('home-location');
const home = localStorage.getItem('home-city');

const initialState = {
  isLoading: false,
  isSuccess: false,
  isLiking: false,
  isVisiting: false,
  isCommenting: false,
  showAlert: false,
  showModal: false,
  showSidebar: false,
  showInfoWindow: false,
  alertText: '',
  alertType: '',
  googleApiKey: 'AIzaSyBZ2XtW_eLHJMGYnoLdznK65WV6tfhBVDM',
  user: user ? JSON.parse(user) : null,
  token: token,
  homeLocation: JSON.parse(homeLocation) || MAP_CENTER,
  myLocation: null,
  home: home || '',
  isEditing: false,
  isMyFoodys: false,
  editFoodyId: '',
  title: '',
  village: '',
  remarks: '',
  cuisine: 'greek',
  foody: 'alaCarte',
  cost: 'average',
  status: 'unpublished',
  distance: '',
  commentText: '',
  foodyLocation: MAP_CENTER,
  cuisineOptions: cuisines,
  foodyOptions: foodys,
  costOptions: costs,
  statusOptions: statuses,
  foodys: [],
  foodyDetail: null,
  totalFoodys: 0,
  page: 1,
  numOfPages: 1,
  stats: {},
  monthlyCreations: [],
  foodyLikes: [],
  search: '',
  searchCuisine: 'all',
  searchFoody: 'all',
  searchCost: 'all',
  searchStatus: 'all',
  searchDistance: 0,
  min_distance: 0,
  max_distance: 0,
  sort: 'latest-created',
  sortOptions: [
    'latest-created',
    'oldest-created',
    'latest-updated',
    'oldest-updated',
    'a-z',
    'z-a',
  ],
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const currentLocation = useGeoLocation();
  state.myLocation = currentLocation;

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

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

  const openInfoWindow = () => {
    dispatch({ type: OPEN_INFO_WINDOW });
  };
  const closeInfoWindow = () => {
    dispatch({ type: CLOSE_INFO_WINDOW });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const addUserToLocalStorage = ({ user, token, location, home }) => [
    localStorage.setItem('user', JSON.stringify(user)),
    localStorage.setItem('token', token),
    localStorage.setItem('home-location', JSON.stringify(location)),
    localStorage.setItem('home-city', home),
  ];

  const removeUserFromLocalStorage = () => [
    localStorage.removeItem('user'),
    localStorage.removeItem('token'),
    localStorage.removeItem('home-location'),
    localStorage.removeItem('home-city'),
  ];

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const { clientApi } = useClientApi(logoutUser);

  const setUserNotificationsToRead = async () => {
    try {
      await clientApi.post('/notifications');
      dispatch({
        type: SET_USER_NOTIFICATIONS_TO_READ,
      });
    } catch (error) {
      console.log('Set Notifications error: ', error.response.data);
      clearAlert();
    }
  };

  const getGoogleApiKey = async () => {
    try {
      const { data } = await clientApi.get('/config/google');
      dispatch({ type: GET_GOOGLE_API_KEY, payload: { key: data } });
    } catch (error) {
      console.log('Google API Key Error: ', error);
    }
  };

  const setUserCurrentLocation = ({ alertText }) => {
    dispatch({ type: SET_USER_CURRENT_LOCATION, payload: { alertText } });
    clearAlert();
  };
  const setFoodyCurrentLocation = ({ alertText }) => {
    dispatch({ type: SET_FOODY_CURRENT_LOCATION, payload: { alertText } });
    clearAlert();
  };

  // useEffect(() => {
  //   // getGoogleApiKey();
  //   // eslint-disable-next-line
  // }, []);

  const signUser = async ({ endPoint, currentUser, alertText }) => {
    dispatch({ type: SIGN_USER_BEGIN });
    try {
      const { data } = await clientApi.post(`/auth/${endPoint}`, currentUser);
      const { user, token, location, home } = data;
      dispatch({
        type: SIGN_USER_SUCCESS,
        payload: { user, token, location, home, alertText },
      });
      addUserToLocalStorage({ user, token, location, home });
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
      dispatch({ type: CLEAR_VALUES });
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
      dispatch({ type: CLEAR_VALUES });
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
      const { user, token, location, home } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token, location, home },
      });
      addUserToLocalStorage({ user, token, location, home });
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

  const createFoody = async () => {
    dispatch({ type: ADD_FOODY_BEGIN });
    try {
      const {
        title,
        village,
        foodyLocation,
        remarks,
        cuisine,
        foody,
        cost,
        status,
      } = state;
      await clientApi.post('/foodys', {
        title,
        village,
        location: foodyLocation,
        remarks,
        cuisine,
        foody,
        cost,
        status,
      });
      dispatch({ type: ADD_FOODY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ADD_FOODY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const setFoodyToUpdate = async (id) => {
    dispatch({ type: SET_EDIT_FOODY, payload: { id } });
  };

  const addUserLocation = (location) => {
    dispatch({ type: ADD_USER_MARKER, payload: { homeLocation: location } });
  };
  const addFoodyLocation = (location) => {
    dispatch({ type: ADD_FOODY_MARKER, payload: { foodyLocation: location } });
  };

  const editFoody = async () => {
    dispatch({ type: UPDATE_FOODY_BEGIN });
    try {
      const {
        editFoodyId,
        title,
        village,
        foodyLocation,
        remarks,
        cuisine,
        foody,
        cost,
        status,
      } = state;
      await clientApi.patch(`/foodys/${editFoodyId}`, {
        title,
        village,
        location: foodyLocation,
        remarks,
        cuisine,
        foody,
        cost,
        status,
      });
      dispatch({ type: UPDATE_FOODY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_FOODY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteFoody = async (foodyId) => {
    dispatch({ type: DELETE_FOODY_BEGIN });
    try {
      const { data } = await clientApi.delete(`/foodys/${foodyId}`);
      dispatch({
        type: DELETE_FOODY_SUCCESS,
        payload: { id: foodyId, msg: data.msg },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_FOODY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const changeFoodyStatus = async (foodyId, status) => {
    dispatch({ type: UPDATE_FOODY_BEGIN });
    try {
      await clientApi.put(`/foodys/${foodyId}/status`, {
        status,
      });
      dispatch({ type: CHANGE_FOODY_STATUS, payload: status });
      dispatch({ type: CLEAR_VALUES });
      getMyFoodys();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_FOODY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const likeUnlikeFoody = async ({ foodyId, like = true }) => {
    try {
      if (like) {
        const { data } = await clientApi.post(`/foodys/like/${foodyId}`);
        dispatch({
          type: LIKE_FOODY,
          payload: { foodyId, data },
        });
      } else {
        const { data } = await clientApi.post(`/foodys/unlike/${foodyId}`);
        dispatch({
          type: UNLIKE_FOODY,
          payload: { foodyId, data },
        });
      }
    } catch (error) {
      console.log('Likes Functionality: ', error.response.data.msg);
    }
    clearAlert();
  };

  const addComment = async ({ foodyId, text }) => {
    try {
      const { data } = await clientApi.post(`/foodys/comment/${foodyId}`, {
        text,
      });
      dispatch({
        type: ADD_COMMENT,
        payload: { foodyId, data },
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log('Add Comment Functionality: ', error.response.data.msg);
    }
    clearAlert();
  };

  const removeComment = async ({ foodyId, commentId }) => {
    try {
      await clientApi.delete(`/foodys/${foodyId}/${commentId}`);
      dispatch({ type: REMOVE_COMMENT, payload: { foodyId, commentId } });
    } catch (error) {
      console.log('Remove Comment Functionality: ', error.response.data.msg);
    }
  };

  const visitUnVisitFoody = async ({ foodyId, visit = true }) => {
    try {
      if (visit) {
        const { data } = await clientApi.post(`/foodys/visit/${foodyId}`);
        dispatch({
          type: VISIT_FOODY,
          payload: { foodyId, data },
        });
      } else {
        const { data } = await clientApi.post(
          `/foodys/remove-visit/${foodyId}`
        );
        dispatch({
          type: UN_VISIT_FOODY,
          payload: { foodyId, data },
        });
      }
    } catch (error) {
      console.log('Visits Functionality: ', error.response.data.msg);
    }
    clearAlert();
  };

  const getFoodyLikes = async ({ foodyId }) => {
    dispatch({ type: GET_FOODY_LIKES_BEGIN });
    try {
      const { data } = await clientApi.get(`/foodys/like/${foodyId}`);
      dispatch({
        type: GET_FOODY_LIKES_SUCCESS,
        payload: {
          data,
          foodyId,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_FOODY_LIKES_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log(error.response);
    }
    clearAlert();
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const setFoodysOrigin = (value) => {
    dispatch({ type: SET_FOODYS_ORIGIN, payload: { value } });
  };

  const getAllFoodys = async () => {
    const { search, searchCuisine, searchFoody, searchCost, sort, page } =
      state;

    let url = `/foodys?status=published&cuisine=${searchCuisine}&cost=${searchCost}&foody=${searchFoody}&sort=${sort}&page=${page}`;
    if (search) {
      url = `${url}&search=${search}`;
    }

    dispatch({ type: GET_FOODYS_BEGIN });
    try {
      const { data } = await clientApi.get(url);
      const { foodys, totalFoodys, numOfPages } = data;
      dispatch({
        type: GET_FOODYS_SUCCESS,
        payload: { foodys, totalFoodys, numOfPages },
      });
      setFoodysOrigin(false);
    } catch (error) {
      //logoutUser();
      console.log('error', error.response);
    }
    clearAlert();
  };

  const getMyFoodys = async () => {
    const {
      search,
      searchCuisine,
      searchFoody,
      searchCost,
      searchStatus,
      //searchPreference,
      sort,
      page,
    } = state;

    let url = `/foodys/my?cuisine=${searchCuisine}&cost=${searchCost}&status=${searchStatus}&foody=${searchFoody}&sort=${sort}&page=${page}`;
    if (search) {
      url = `${url}&search=${search}`;
    }
    dispatch({ type: GET_FOODYS_BEGIN });
    try {
      const { data } = await clientApi.get(url);
      const { myFoodys, totalFoodys, numOfPages } = data;
      dispatch({
        type: GET_FOODYS_SUCCESS,
        payload: { foodys: myFoodys, totalFoodys, numOfPages },
      });
      setFoodysOrigin(true);
    } catch (error) {
      //logoutUser();
      console.log('error', error.response);
    }
    clearAlert();
  };

  const getFoody = (slug) => {
    dispatch({ type: GET_FOODY_DETAIL, payload: { slug } });
  };

  const getUserStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await clientApi.get('/foodys/user-stats');
      const { defaultUserStats, monthlyUserCreations } = data;
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: defaultUserStats,
          monthlyCreations: monthlyUserCreations,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };

  const getAllStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await clientApi.get('/foodys/all-stats');
      const { defaultAllStats, monthlyAllCreations } = data;
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: defaultAllStats,
          monthlyCreations: monthlyAllCreations,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        handleChange,
        signUser,
        forgotPassword,
        resetPassword,
        updateUser,
        toggleSidebar,
        toggleModal,
        logoutUser,
        openInfoWindow,
        closeInfoWindow,
        createFoody,
        setFoodyToUpdate,
        editFoody,
        getFoody,
        deleteFoody,
        clearValues,
        getMyFoodys,
        getAllFoodys,
        getUserStats,
        getAllStats,
        clearFilters,
        changeFoodyStatus,
        changePage,
        addFoodyLocation,
        addUserLocation,
        getGoogleApiKey,
        setUserCurrentLocation,
        setFoodyCurrentLocation,
        likeUnlikeFoody,
        getFoodyLikes,
        visitUnVisitFoody,
        addComment,
        removeComment,
        setUserNotificationsToRead,
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
