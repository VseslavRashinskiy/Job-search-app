import axios, { AxiosResponse } from 'axios';

export const getAccessToken = async () => {
  const apiUrl = 'https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/';
  const secretKey = 'GEU4nvd3rej*jeh.eqp';

  try {
    const response: AxiosResponse = await axios.post(
      apiUrl,
      {
        login: 'sergei.stralenia@gmail.com',
        password: 'paralect123',
        client_id: '2356',
        client_secret:
          'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
        hr: '0',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-secret-key': secretKey,
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

const fetchJobVacancies = async () => {
  const proxyUrl = 'https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/';
  const secretKey = 'GEU4nvd3rej*jeh.eqp';
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(proxyUrl, {
      headers: {
        'X-Api-App-Id':
          'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
        'x-secret-key': secretKey,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const vacancies = response.data;
    return vacancies;
  } catch (error) {
    console.error(error);
  }
};

export default fetchJobVacancies;
