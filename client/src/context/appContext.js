import { useContext, createContext, useReducer } from 'react';
import useClientApi from '../hooks/useClientApi';
import reducer from './reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  SIGN_USER_BEGIN,
  SIGN_USER_SUCCESS,
  SIGN_USER_ERROR,
  TOGGLE_SIDEBAR,
  TOGGLE_MODAL,
  CLOSE_INFO_WINDOW,
  OPEN_INFO_WINDOW,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  ADD_FOODY_BEGIN,
  ADD_FOODY_SUCCESS,
  ADD_FOODY_ERROR,
  GET_FOODYS_BEGIN,
  GET_FOODYS_SUCCESS,
  SET_EDIT_FOODY,
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
  GET_GOOGLE_API_KEY,
} from './actions';
import { costs, cuisines, foodys, statuses } from '../utils/lookup-data';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');
const home = localStorage.getItem('home');

const initialState = {
  isLoading: false,
  showAlert: false,
  showModal: false,
  showSidebar: false,
  showInfoWindow: false,
  alertText: '',
  alertType: '',
  googleApiKey: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: JSON.parse(userLocation) || {
    lat: 0,
    lng: 0,
  },
  home: home || '',
  isEditing: false,
  editFoodyId: '',
  title: '',
  village: '',
  remarks: '',
  cuisine: 'greek',
  foody: 'alaCarte',
  cost: 'average',
  status: 'unpublished',
  location: {
    lat: 0,
    lng: 0,
  },
  cuisineOptions: cuisines,
  foodyOptions: foodys,
  costOptions: costs,
  statusOptions: statuses,
  foodLocation: home || '',
  foodys: [],
  totalFoodys: 0,
  page: 1,
  numOfPages: 1,
  stats: {},
  monthlyCreations: [],
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
    localStorage.setItem('location', JSON.stringify(location)),
    localStorage.setItem('home', home),
  ];

  const removeUserFromLocalStorage = () => [
    localStorage.removeItem('user'),
    localStorage.removeItem('token'),
    localStorage.removeItem('location'),
    localStorage.removeItem('home'),
  ];

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const { clientApi } = useClientApi(logoutUser);

  const getGoogleApiKey = async () => {
    try {
      const { data } = await clientApi.get('/config/google');
      dispatch({ type: GET_GOOGLE_API_KEY, payload: { key: data } });
    } catch (error) {
      console.log('Google API Key Error: ', error);
    }
  };

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
        location,
        remarks,
        cuisine,
        foody,
        cost,
        status,
      } = state;
      await clientApi.post('/foodys', {
        title,
        village,
        location,
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
    dispatch({ type: ADD_USER_MARKER, payload: { userLocation: location } });
  };
  const addFoodyLocation = (location) => {
    dispatch({ type: ADD_FOODY_MARKER, payload: { location } });
  };

  const editFoody = async () => {
    dispatch({ type: UPDATE_FOODY_BEGIN });
    try {
      const {
        editFoodyId,
        title,
        village,
        location,
        remarks,
        cuisine,
        foody,
        cost,
        status,
      } = state;
      await clientApi.patch(`/foodys/${editFoodyId}`, {
        title,
        village,
        location,
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

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
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
    } catch (error) {
      logoutUser();
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
    } catch (error) {
      logoutUser();
      console.log('error', error.response);
    }
    clearAlert();
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
        updateUser,
        toggleSidebar,
        toggleModal,
        logoutUser,
        openInfoWindow,
        closeInfoWindow,
        createFoody,
        setFoodyToUpdate,
        editFoody,
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
