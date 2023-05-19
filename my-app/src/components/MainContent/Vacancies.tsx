import { useState } from 'react';
import vacancies from '../constant';
import JobCard from './Card';
import SearchBar from './Search';
import fetchJobVacancies from '../Response';
import { Vacancy } from '../Main';

const Vacancies = (props) => {
  console.log(props);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchTermChange = (searchTerm: string) => {
    localStorage.setItem('Term', searchTerm);
    setSearchTerm(searchTerm);
  };

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
