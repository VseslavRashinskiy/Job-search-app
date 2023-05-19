import axios from 'axios';
import FilterCard from './MainContent/FilterCard';
import Vacancies from './MainContent/Vacancies';
import { getAccessToken } from './Response';
import { useState, useEffect } from 'react';
import vacancies from './constant';

export interface Vacancy {
  address: string;
  age_from: number;
  age_to: number;
  agency: {
    id: number;
    title: string;
  };
  agreement: boolean;
  already_sent_on_vacancy: boolean;
  anonymous: boolean;
  canEdit: boolean;
  candidat: string;
  children: {
    id: number;
    title: string;
  };
}

const Main = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
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
        setJobs(vacancies.objects);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobVacancies();
  }, []);

  console.log(jobs);

  return (
    <div className="main">
      <FilterCard />
      <Vacancies vacancies={jobs} />
    </div>
  );
};

export default Main;
