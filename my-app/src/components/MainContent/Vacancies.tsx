import vacancies from '../constant';
import JobCard from './Card';
import SearchBar from './Search';

const Vacancies = () => {
  return (
    <div className="frame">
      <SearchBar />
      {vacancies.map((el) => (
        <JobCard key={el.id} el={el} />
      ))}
    </div>
  );
};

export default Vacancies;
