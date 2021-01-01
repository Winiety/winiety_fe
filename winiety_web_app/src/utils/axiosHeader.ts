import axios from 'axios';

const setAuthHeader = (token: string): void => {
  axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';
};

export default setAuthHeader;
