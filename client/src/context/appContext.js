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
} from './actions';
import costs from '../utils/costs';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  showSidebar: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  isEditing: false,
  placeEditId: '',
  title: '',
  village: '',
  remarks: '',
  cuisine: 'greek',
  foody: 'pending',
  cost: 'pending',
  status: 'unpublished',
  preference: 'pending',
  cuisineOptions: ['greek', 'asian', 'italian', 'mexican'],
  foodyOptions: ['pending', 'meze', 'ala-kart', 'buffet'],
  costOptions: costs,
  statusOptions: ['unpublished', 'published'],
  preferenceOptions: ['pending', 'not-interested', 'visited', 'interested'],
  foodLocation: userLocation || '',
  foodys: [],
  myFoodys: [],
  totalFoodys: 0,
  page: 1,
  numOfPages: 1,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const handleChange = ({ name, value }) => {
    console.log('dispatch', value);
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const addUserToLocalStorage = ({ user, token, location }) => [
    localStorage.setItem('user', JSON.stringify(user)),
    localStorage.setItem('token', token),
    localStorage.setItem('location', location),
  ];

  const removeUserFromLocalStorage = () => [
    localStorage.removeItem('user'),
    localStorage.removeItem('token'),
    localStorage.removeItem('location'),
  ];
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const { clientApi } = useClientApi(logoutUser);

  const signUser = async ({ endPoint, currentUser, alertText }) => {
    dispatch({ type: SIGN_USER_BEGIN });
    try {
      const { data } = await clientApi.post(`/auth/${endPoint}`, currentUser);
      const { user, token, location } = data;
      dispatch({
        type: SIGN_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SIGN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clearAlert();
    }
  };

  const updateUser = async (userToUpdate) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await clientApi.patch('/auth/update-user', userToUpdate);
      const { user, token, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
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
      const { title, village, remarks, cuisine, foody, cost, status } = state;
      await clientApi.post('/foodys', {
        title,
        village,
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

  const editFoody = async (id) => {
    console.log('EDIT FOODY', id);
    dispatch({ type: SET_EDIT_FOODY, payload: { id } });
  };

  const deleteFoody = async (title) => {
    console.log('EDIT FOODY', title);
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const getAllFoodys = async () => {
    dispatch({ type: GET_FOODYS_BEGIN });
    try {
      const { data } = await clientApi.get('/foodys');
      const { foodys, totalFoodys, numOfPages } = data;
      dispatch({
        type: GET_FOODYS_SUCCESS,
        payload: { foodys, totalFoodys, numOfPages },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getMyFoodys = async () => {
    dispatch({ type: GET_FOODYS_BEGIN });
    try {
      const { data } = await clientApi.get('/foodys/my');
      const { myFoodys, totalFoodys, numOfPages } = data;
      dispatch({
        type: GET_FOODYS_SUCCESS,
        payload: { foodys: myFoodys, totalFoodys, numOfPages },
      });
    } catch (error) {
      logoutUser();
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
        logoutUser,
        createFoody,
        editFoody,
        deleteFoody,
        clearValues,
        getMyFoodys,
        getAllFoodys,
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
