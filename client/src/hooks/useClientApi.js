import axios from 'axios';

const useClientApi = (logoutUser) => {
  const CancelTokenApi = axios.CancelToken;

  const clientApi = axios.create({
    baseURL: '/api/v1',
  });

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

  clientApi.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        console.log('😱 Error authentication: ', error.response.data.msg);
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  return { clientApi, CancelTokenApi };
};
export default useClientApi;
