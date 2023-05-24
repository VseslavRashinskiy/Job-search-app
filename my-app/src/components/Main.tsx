import axios from 'axios';
import FilterCard from './MainContent/FilterCard';
import Vacancies from './MainContent/Vacancies';
import { getAccessToken } from './ResponseToken';
import { useState, useEffect } from 'react';
import { DEF_VAC, Vacancy } from './constants';

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState<Vacancy[]>([]);
  const [search, setSearch] = useState('');
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
          params: {
            page: currentPage,
            count: DEF_VAC,
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
  }, [currentPage]);

  const handleFilteredJobs = (filteredJobs: Vacancy[]) => {
    setJobs(filteredJobs);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
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
        vacancies={jobs}
        handleFilteredJobs={handleFilteredJobs}
        setJobs={setJobs}
        isErr={isErr}
        isLoaded={isLoaded}
        setLoader={setIsLoaded}
        setSearch={setSearch}
        search={search}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Main;
