import axios from 'axios';

const API_KEY = '33498062-ee2b42b41cbde2a2a11e8f88d';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImages = async (searchQuery, page) => {
  const params = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: page,
  };

  const response = await axios.get('/', { params });
  if (response.status === 200 && response.data) {
    console.log(response.data);
    return response.data;
  } else {
    throw new Error('Response error: undefined or wrong status code');
  }
};
