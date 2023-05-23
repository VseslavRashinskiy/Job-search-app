import { Vacancy } from '../Main';
import JobCard from './JobCard';
import SearchBar from './Search';
import { Text, Pagination } from '@mantine/core';
import { useState } from 'react';

interface VacanciesProps {
  vacancies: Vacancy[];
  isErr: boolean;
  isLoaded: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  handleFilteredJobs: (filteredJobs: Vacancy[]) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
}

const Vacancies = (props: VacanciesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(props.vacancies.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleJobs = props.vacancies.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="frame">
      <SearchBar
        handleFilteredJobs={props.handleFilteredJobs}
        setLoader={props.setLoader}
        setSearch={props.setSearch}
        search={props.search}
      />
      {!props.isLoaded ? (
        <Text>
          Loading <img height={22} src="https://i.ibb.co/RpSP280/6.gif" alt="loading"></img>
        </Text>
      ) : (
        (!props.isErr && visibleJobs.map((el) => <JobCard key={el.id} el={el} />)) || (
          <Text>Not Found</Text>
        )
      )}

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Pagination
            total={totalPages}
            value={currentPage}
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
