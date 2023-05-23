import { Vacancy } from '../Main';
import JobCard from './JobCard';
import SearchBar from './Search';
import { Text } from '@mantine/core';

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
