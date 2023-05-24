import JobCard from '../MainContent/JobCard';
import { Vacancy } from '../constants';
import EmptyPage from '../EmptyPage';

const Favorites = () => {
  const savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
  return (
    <div className="favorites">
      {savedItems.length === 0 ? (
        <EmptyPage />
      ) : (
        <>
          {savedItems.map((el: Vacancy) => (
            <JobCard key={el.id} el={el} />
          ))}
        </>
      )}
    </div>
  );
};

export default Favorites;
