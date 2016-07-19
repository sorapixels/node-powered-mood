import axios from 'axios';

const BASE_URL = 'https://npm-search.tuvistavie.com/';

export default function findPackage(name) {
  const url = BASE_URL + name;
  return axios.get(url).then(res => res.data);
};
