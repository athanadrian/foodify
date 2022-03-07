import axios from 'axios';

const useClientApi = (logoutUser) => {
  const CancelTokenApi = axios.CancelToken;

  // axios
  const clientApi = axios.create({
    baseURL: '/api/v1',
  });
  // request

  clientApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      config.headers.common['Authorization'] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  clientApi.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        console.log('Error: ', error.response.data.msg);
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  return { clientApi, CancelTokenApi };
};
export default useClientApi;
