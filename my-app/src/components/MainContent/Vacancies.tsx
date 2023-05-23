import { Vacancy } from '../Main';
import JobCard from './JobCard';
import SearchBar from './Search';
import { Text } from '@mantine/core';

interface VacanciesProps {
  vacancies: Vacancy[];
  handleSearch: (query: string) => void;
  isErr: boolean;
  isLoaded: boolean;
  handleFilteredJobs: (filteredJobs: Vacancy[]) => void;
}

const Vacancies = (props: VacanciesProps) => {
  return (
    <div className="frame">
      <SearchBar handleSearch={props.handleSearch} handleFilteredJobs={props.handleFilteredJobs} />
      {!props.isLoaded ? (
        <Text>
          Loading <img height={22} src="https://i.ibb.co/RpSP280/6.gif"></img>
        </Text>
      ) : (
        (!props.isErr && props.vacancies.map((el) => <JobCard key={el.id} el={el} />)) || (
          <Text>Not Found</Text>
        )
      )}
    </div>
  );
};

export default Vacancies;
