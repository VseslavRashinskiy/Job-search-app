import axios, { AxiosResponse } from 'axios';
import { API_URL_CATALOGUES, API_URL_PASSWORD, CLIENT_SECRET, SECRET_KEY } from './constants';

export const getAccessToken = async () => {
  try {
    const response: AxiosResponse = await axios.post(
      API_URL_PASSWORD,
      {
        login: 'sergei.stralenia@gmail.com',
        password: 'paralect123',
        client_id: '2356',
        client_secret: CLIENT_SECRET,
        hr: '0',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-secret-key': SECRET_KEY,
        },
      }
    );

    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

export const fetchJobCategories = async () => {
  const proxyUrl = API_URL_CATALOGUES;
  const secretKey = SECRET_KEY;
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(proxyUrl, {
      headers: {
        'X-Api-App-Id': CLIENT_SECRET,
        'x-secret-key': secretKey,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const categories = response.data;
    return categories;
  } catch (error) {}
};
