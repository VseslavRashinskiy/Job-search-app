import axios from 'axios';
import { getAccessToken } from '../ResponseToken';
import {
  API_URL_VACANCIES,
  CLIENT_SECRET,
  DEF_VAC,
  MAX_API,
  SECRET_KEY,
  VacanciesProps,
} from '../constants';
import JobCard from './JobCard';
import SearchBar from './Search';
import { Text, Pagination } from '@mantine/core';
import { useEffect, useState } from 'react';
import EmptyPage from '../EmptyPageFavorites';

const Vacancies = (props: VacanciesProps) => {
  const [countPages, setCountPages] = useState(MAX_API);
  const totalPages = Math.ceil(countPages / DEF_VAC);

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
            page: props.currentPage,
            count: DEF_VAC,
          },
        });

        const vacancies = response.data;
        props.setLoader(true);
        props.setJobs(vacancies.objects);
      } catch (error) {
        console.log(error);
        props.setLoader(true);
      }
    };
    fetchJobVacancies();
  }, [props.currentPage]);

  const handlePageChange = (newPage: number) => {
    props.setCurrentPage(newPage);
    props.handlePageChange(newPage);
  };
  const handleApplyPage = (totalPages: number) => {
    if (totalPages > MAX_API) {
      setCountPages(MAX_API);
    } else {
      setCountPages(totalPages);
    }
  };

  return (
    <div className="frame">
      <SearchBar
        handleFilteredJobs={props.handleFilteredJobs}
        setLoader={props.setLoader}
        setSearch={props.setSearch}
        search={props.search}
        currentPage={props.currentPage}
        handleApplyPage={handleApplyPage}
      />
      {!props.isLoaded ? (
        <Text>
          Loading <img height={22} src="https://i.ibb.co/RpSP280/6.gif" alt="loading"></img>
        </Text>
      ) : (
        (props.vacancies.length !== 0 &&
          props.vacancies.map((el) => <JobCard key={el.id} el={el} />)) || <EmptyPage />
      )}

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Pagination
            total={totalPages}
            value={props.currentPage}
            onChange={handlePageChange}
            size="sm"
            radius="sm"
            variant="outline"
          />
        </div>
      )}
    </div>
  );
};

export default Vacancies;
