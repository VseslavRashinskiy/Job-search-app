import axios from 'axios';
import FilterCard from './MainContent/FilterCard';
import Vacancies from './MainContent/Vacancies';
import { getAccessToken } from './ResponseToken';
import { useState, useEffect } from 'react';
import { API_URL_VACANCIES, CLIENT_SECRET, DEF_VAC, SECRET_KEY, Vacancy } from './constants';

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState<Vacancy[]>([]);
  const [search, setSearch] = useState('');
  const [isErr, setIsErr] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchJobVacancies = async () => {
      try {
        const accessToken = await getAccessToken();
        const response = await axios.get(API_URL_VACANCIES, {
          headers: {
            'X-Api-App-Id': CLIENT_SECRET,
            'x-secret-key': SECRET_KEY,
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
