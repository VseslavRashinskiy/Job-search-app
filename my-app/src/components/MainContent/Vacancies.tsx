import axios from 'axios';
import { getAccessToken } from '../ResponseToken';
import { DEF_VAC, MAX_API, VacanciesProps } from '../constants';
import JobCard from './JobCard';
import SearchBar from './Search';
import { Text, Pagination } from '@mantine/core';
import { useEffect, useState } from 'react';

const Vacancies = (props: VacanciesProps) => {
  const [countPages, setCountPages] = useState(MAX_API);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(countPages / itemsPerPage);

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
            page: props.currentPage,
            count: DEF_VAC,
          },
        });

        const vacancies = response.data;
        props.setLoader(true);
        props.setJobs(vacancies.objects);
      } catch (error) {
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
        (!props.isErr && props.vacancies.map((el) => <JobCard key={el.id} el={el} />)) || (
          <Text>Not Found</Text>
        )
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
