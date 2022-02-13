import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  SIGN_USER_BEGIN,
  SIGN_USER_SUCCESS,
  SIGN_USER_ERROR,
  TOGGLE_SIDEBAR,
  TOGGLE_MODAL,
  OPEN_INFO_WINDOW,
  CLOSE_INFO_WINDOW,
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
  SET_USER_CURRENT_LOCATION,
  SET_FOODY_CURRENT_LOCATION,
} from './actions';

import { initialState } from './appContext';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }
  if (action.type === SIGN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SIGN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      homeLocation: action.payload.location,
      home: action.payload.home,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SIGN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === TOGGLE_MODAL) {
    return {
      ...state,
      showModal: !state.showModal,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      homeLocation: null,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      homeLocation: action.payload.location,
      home: action.payload.home,
      //jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'Profile successfully updated',
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === ADD_FOODY_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === ADD_FOODY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Foody Created Successfully!',
    };
  }

  if (action.type === ADD_FOODY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_VALUES) {
    return {
      ...state,
      isEditing: false,
      placeEditId: '',
      title: '',
      village: '',
      foodyLocation: {
        lat: 0,
        lng: 0,
      },
      //description: '',
      status: 'unpublished',
      cuisine: 'greek',
      cost: 'average',
      foody: 'alaCarte',
      remarks: '',
      //foodLocation: state.userLocation,
    };
  }

  if (action.type === GET_FOODYS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_FOODYS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      foodys: action.payload.foodys,
      totalFoodys: action.payload.totalFoodys,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_EDIT_FOODY) {
    const foodyToUpdate = state.foodys.find(
      (foody) => foody._id === action.payload.id
    );
    const {
      _id,
      title,
      village,
      location,
      cuisine,
      foody,
      cost,
      status,
      preference,
      remarks,
    } = foodyToUpdate;
    return {
      ...state,
      isEditing: true,
      editFoodyId: _id,
      title,
      village,
      foodyLocation: location,
      cuisine,
      foody,
      cost,
      status,
      preference,
      remarks,
    };
  }

  if (action.type === UPDATE_FOODY_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_FOODY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Foody Updated Successfully!',
    };
  }

  if (action.type === CHANGE_FOODY_STATUS) {
    return {
      ...state,
      status: action.payload.changedStatus,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Foody Published Successfully!',
    };
  }

  if (action.type === UPDATE_FOODY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === DELETE_FOODY_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === DELETE_FOODY_SUCCESS) {
    const remainingFoodys = state.foodys.filter(
      (foody) => foody._id !== action.payload.id
    );
    return {
      ...state,
      foodys: remainingFoodys,
      totalFoodys: remainingFoodys.length,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.msg,
    };
  }
  if (action.type === DELETE_FOODY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyCreations: action.payload.monthlyCreations,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: '',
      searchCuisine: 'all',
      searchFoody: 'all',
      searchCost: 'all',
      searchStatus: 'all',
      searchReference: 'all',
      sort: 'latest-created',
    };
  }

  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }

  if (action.type === ADD_FOODY_MARKER) {
    return {
      ...state,
      foodyLocation: action.payload.foodyLocation,
    };
  }

  if (action.type === ADD_USER_MARKER) {
    return {
      ...state,
      homeLocation: action.payload.homeLocation,
    };
  }

  if (action.type === OPEN_INFO_WINDOW) {
    return {
      ...state,
      showInfoWindow: true,
    };
  }
  if (action.type === CLOSE_INFO_WINDOW) {
    return {
      ...state,
      showInfoWindow: false,
    };
  }

  if (action.type === GET_GOOGLE_API_KEY) {
    return {
      ...state,
      googleApiKey: action.payload.key,
    };
  }

  if (action.type === SET_USER_CURRENT_LOCATION) {
    return {
      ...state,
      homeLocation: {
        lat: state.myLocation.coordinates.lat,
        lng: state.myLocation.coordinates.lng,
      },
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }

  if (action.type === SET_FOODY_CURRENT_LOCATION) {
    return {
      ...state,
      foodyLocation: {
        lat: state.myLocation.coordinates.lat,
        lng: state.myLocation.coordinates.lng,
      },
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
