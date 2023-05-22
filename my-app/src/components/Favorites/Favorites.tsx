import { Vacancy } from '../Main';
import JobCard from '../MainContent/JobCard';

const Favorites = () => {
  const savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
  return (
    <div>
      {savedItems.map((el: Vacancy) => (
        <JobCard key={el.id} el={el} />
      ))}
    </div>
  );
};

export default Favorites;
