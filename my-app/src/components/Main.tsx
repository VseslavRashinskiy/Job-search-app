import axios from 'axios';
import FilterCard from './MainContent/FilterCard';
import Vacancies from './MainContent/Vacancies';
import { getAccessToken } from './ResponseToken';
import { useState, useEffect } from 'react';

export interface Vacancy {
  id: number;
  profession: string;
  payment_from: number;
  address: string;
  canEdit: boolean;
  type_of_work: {
    id: number;
    title: string;
  };
  town: {
    id: number;
    title: string;
  };
}

const Main = () => {
  const [jobs, setJobs] = useState<Vacancy[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Vacancy[]>([]);
  const [isErr, setIsErr] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
        setIsLoaded(true);
      } catch (error) {
        setIsLoaded(true);
        setIsErr(true);
      }
    };
    fetchJobVacancies();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = jobs.filter((job) =>
      job.profession.toLowerCase().includes(query.toLowerCase())
    );
    if (filtered.length !== 0) {
      setFilteredJobs(filtered);
      setIsErr(false);
    } else {
      setIsErr(true);
    }
  };

  return (
    <div className="main">
      <FilterCard />
      <Vacancies
        vacancies={filteredJobs.length > 0 ? filteredJobs : jobs}
        handleSearch={handleSearch}
        isErr={isErr}
        isLoaded={isLoaded}
      />
    </div>
  );
};

export default Main;
