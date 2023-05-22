import { Vacancy } from '../Main';
import JobCard from './Card';
import SearchBar from './Search';

interface VacanciesProps {
  vacancies: Vacancy[];
}

const Vacancies = (props: VacanciesProps) => {
  console.log(props.vacancies);
  return (
    <div className="frame">
      <SearchBar />
      {props.vacancies.map((el) => (
        <JobCard key={el.id} el={el} />
      ))}
    </div>
  );
};

export default Vacancies;
