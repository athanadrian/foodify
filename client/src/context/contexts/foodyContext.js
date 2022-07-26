import { useContext, createContext, useReducer } from 'react';
import useClientApi from 'hooks/useClientApi';
import reducer from '../reducers/foodyReducer';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  TOGGLE_SIDEBAR,
  TOGGLE_MODAL,
  OPEN_INFO_WINDOW,
  CLOSE_INFO_WINDOW,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  ADD_FOODY_BEGIN,
  ADD_FOODY_SUCCESS,
  ADD_FOODY_ERROR,
  GET_FOODYS_BEGIN,
  GET_FOODYS_SUCCESS,
  GET_FOODY_DETAIL,
  GET_FOODY_LIKES_BEGIN,
  GET_FOODY_LIKES_SUCCESS,
  GET_FOODY_LIKES_ERROR,
  LIKE_FOODY,
  UNLIKE_FOODY,
  VISIT_FOODY,
  UN_VISIT_FOODY,
  ADD_COMMENT,
  REMOVE_COMMENT,
  SET_FOODYS_ORIGIN,
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
  SET_FOODY_CURRENT_LOCATION,
  ADD_USER_MARKER,
} from '../actions/foodyActions';
import { costs, cuisines, types, menus, statuses } from 'utils/lookup-data';
import useGeoLocation from 'hooks/useGeolocation';
import { MAP_CENTER } from 'utils/constants';
import { useAppContext } from './appContext';

const initialState = {
  isFoodyLoading: false,
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
  myLocation: null,
  isEditing: false,
  isMyFoodys: false,
  editFoodyId: '',
  title: '',
  village: '',
  phone: '',
  remarks: '',
  cuisine: 'greek',
  type: 'lunch',
  menu: 'alaCarte',
  cost: 'average',
  status: 'unpublished',
  commentText: '',
  foodyLocation: MAP_CENTER,
  cuisineOptions: cuisines,
  typeOptions: types,
  menuOptions: menus,
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
  searchType: 'all',
  searchMenu: 'all',
  searchCost: 'all',
  searchStatus: 'all',
  searchDistance: 0,
  min_distance: 0,
  max_distance: 500,
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

const FoodyContext = createContext();

const FoodyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setUserHomeLocation, homeLocation } = useAppContext();
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
    if (name === 'searchDistance') {
      value = Number(value);
    }
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const { clientApi } = useClientApi();

  const setFoodyCurrentLocation = ({ alertText }) => {
    dispatch({ type: SET_FOODY_CURRENT_LOCATION, payload: { alertText } });
    clearAlert();
  };

  const createFoody = async () => {
    dispatch({ type: ADD_FOODY_BEGIN });
    try {
      const {
        title,
        village,
        phone,
        foodyLocation,
        remarks,
        cuisine,
        menu,
        cost,
        status,
      } = state;
      await clientApi.post('/foodys', {
        title,
        village,
        phone,
        location: foodyLocation,
        remarks,
        cuisine,
        menu,
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

  const addUserLocation = (location, alertText) => {
    dispatch({ type: ADD_USER_MARKER, payload: { alertText } });
    setUserHomeLocation({ location, alertText: state.alertText });
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
        phone,
        foodyLocation,
        remarks,
        cuisine,
        type,
        menu,
        cost,
        status,
      } = state;
      await clientApi.patch(`/foodys/${editFoodyId}`, {
        title,
        village,
        phone,
        location: foodyLocation,
        remarks,
        cuisine,
        type,
        menu,
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
      console.log('😱 Error Like/Unlike Foody: ', error.response.data.msg);
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
      console.log('😱 Error Add Comment to Foody: ', error.response.data.msg);
    }
    clearAlert();
  };

  const removeComment = async ({ foodyId, commentId }) => {
    try {
      await clientApi.delete(`/foodys/${foodyId}/${commentId}`);
      dispatch({ type: REMOVE_COMMENT, payload: { foodyId, commentId } });
    } catch (error) {
      console.log(
        '😱 Error Remove Comment Functionality: ',
        error.response.data.msg
      );
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
      console.log('😱 Error Visits Functionality: ', error.response.data.msg);
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
      console.log('😱 Error Visits Functionality: ', error.response.data.msg);
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
    const {
      search,
      searchCuisine,
      searchType,
      searchMenu,
      searchCost,
      sort,
      page,
    } = state;

    let url = `/foodys?status=published&cuisine=${searchCuisine}&type=${searchType}&cost=${searchCost}&menu=${searchMenu}&sort=${sort}&page=${page}`;
    if (search) {
      url = `${url}&search=${search}`;
    }

    dispatch({ type: GET_FOODYS_BEGIN });
    try {
      const { data } = await clientApi.get(url);
      const { foodys, totalFoodys, numOfPages } = data;
      dispatch({
        type: GET_FOODYS_SUCCESS,
        payload: { foodys, totalFoodys, numOfPages, homeLocation },
      });
      setFoodysOrigin(false);
    } catch (error) {
      //logoutUser();
      console.log('😱 Error Get all foodys', error.response);
    }
    clearAlert();
  };

  const getMyFoodys = async () => {
    const {
      search,
      searchCuisine,
      searchType,
      searchMenu,
      searchCost,
      searchStatus,
      sort,
      page,
    } = state;

    let url = `/foodys/my?cuisine=${searchCuisine}&type=${searchType}&cost=${searchCost}&status=${searchStatus}&menu=${searchMenu}&sort=${sort}&page=${page}`;
    if (search) {
      url = `${url}&search=${search}`;
    }
    dispatch({ type: GET_FOODYS_BEGIN });
    try {
      const { data } = await clientApi.get(url);
      const { myFoodys, totalFoodys, numOfPages } = data;
      dispatch({
        type: GET_FOODYS_SUCCESS,
        payload: { foodys: myFoodys, totalFoodys, numOfPages, homeLocation },
      });
      setFoodysOrigin(true);
    } catch (error) {
      //logoutUser();
      console.log('😱 Error Get my foodys', error.response);
    }
    clearAlert();
  };

  const getProfileFoodys = async ({ username, label }) => {
    const { page } = state;
    let url = `/foodys/${username}?action=${label}&page=${page}`;

    dispatch({ type: GET_FOODYS_BEGIN });
    try {
      const { data } = await clientApi.put(url);
      const { foodys, totalFoodys, numOfPages } = data;
      dispatch({
        type: GET_FOODYS_SUCCESS,
        payload: { foodys, totalFoodys, numOfPages, homeLocation },
      });
      setFoodysOrigin(false);
    } catch (error) {
      //logoutUser();
      console.log('😱 Error Get profile foodys', error.response);
    }
    clearAlert();
  };

  const getFoody = async (slug) => {
    if (state.foodys.length === 0) await getMyFoodys();
    dispatch({ type: GET_FOODY_DETAIL, payload: { slug } });
  };

  const getUserStats = async (username) => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await clientApi.get(`/foodys/stats/${username}`);
      const { defaultUserStats, monthlyUserCreations } = data;
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: defaultUserStats,
          monthlyCreations: monthlyUserCreations,
        },
      });
    } catch (error) {
      console.log('😱 Error Get foody', error.response);
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
      console.log('😱 Error Get all stats', error.response);
    }
    clearAlert();
  };

  return (
    <FoodyContext.Provider
      value={{
        ...state,
        displayAlert,
        handleChange,
        toggleSidebar,
        toggleModal,
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
        setFoodyCurrentLocation,
        likeUnlikeFoody,
        getFoodyLikes,
        visitUnVisitFoody,
        addComment,
        removeComment,
        getProfileFoodys,
      }}
    >
      {children}
    </FoodyContext.Provider>
  );
};

const useFoodyContext = () => {
  return useContext(FoodyContext);
};

export { FoodyProvider, useFoodyContext, initialState };
