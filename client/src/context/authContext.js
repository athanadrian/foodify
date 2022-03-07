import { useContext, createContext, useReducer } from 'react';
import useClientApi from '../hooks/useClientApi';
import reducer from './reducers/authReducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  CHECK_USERNAME_BEGIN,
  CHECK_USERNAME_SUCCESS,
  CHECK_USERNAME_ERROR,
} from './actions/authActions';

const initialState = {
  isUsernameChecking: false,
  isUsernameAvailable: false,
  showUsernameAlert: false,
  alertUsernameText: '',
  alertUsernameType: '',
};
let cancel;
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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

  const { clientApi } = useClientApi();

  const checkUsernameAvailability = async (username) => {
    console.log('in check');
    console.log('username', username);

    dispatch({ type: CHECK_USERNAME_BEGIN });
    try {
      console.log('in try');

      cancel && cancel();

      const CancelToken = clientApi.CancelToken;

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

  return (
    <AuthContext.Provider
      value={{
        ...state,
        displayAlert,
        checkUsernameAvailability,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
