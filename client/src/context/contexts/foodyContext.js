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
  SET_USER_CURRENT_LOCATION,
  GET_GOOGLE_API_KEY,
} from '../actions/foodyActions';
import { costs, cuisines, foodys, statuses } from 'utils/lookup-data';
import useGeoLocation from 'hooks/useGeolocation';
import { MAP_CENTER } from 'utils/constants';

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

const FoodyContext = createContext();

const FoodyProvider = ({ children }) => {
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

  const { clientApi } = useClientApi();

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

  const getFoody = async (slug) => {
    if (state.foodys.length === 0) await getMyFoodys();
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
        getGoogleApiKey,
        setUserCurrentLocation,
        setFoodyCurrentLocation,
        likeUnlikeFoody,
        getFoodyLikes,
        visitUnVisitFoody,
        addComment,
        removeComment,
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
