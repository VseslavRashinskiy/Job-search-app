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
  favorite: boolean;
  type_of_work: {
    id: number;
    title: string;
  };
  town: {
    id: number;
    title: string;
  };
  currency: string;
  vacancyRichText: string;
}

const Main = () => {
  const [jobs, setJobs] = useState<Vacancy[]>([]);
  const [search, setSearch] = useState('');
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

  const handleFilteredJobs = (filteredJobs: Vacancy[]) => {
    setFilteredJobs(filteredJobs);
  };

  return (
    <div className="main">
      <FilterCard
        handleFilteredJobs={handleFilteredJobs}
        search={search}
        setLoader={setIsLoaded}
        setSearch={setSearch}
      />
      <Vacancies
        vacancies={filteredJobs.length > 0 ? filteredJobs : jobs}
        // handleSearch={handleSearch}
        handleFilteredJobs={handleFilteredJobs}
        isErr={isErr}
        isLoaded={isLoaded}
        setLoader={setIsLoaded}
        setSearch={setSearch}
        search={search}
      />
    </div>
  );
};

export default Main;
