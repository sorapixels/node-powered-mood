import axios from 'axios';

const API_URL = 'https://npmdrink.azurewebsites.net/api/';

export default function findPackage(name) {
  return axios.get(API_URL + name);
};
