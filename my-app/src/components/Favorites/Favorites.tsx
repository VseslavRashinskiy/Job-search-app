import JobCard from '../MainContent/JobCard';
import { DEF_VAC, Vacancy } from '../constants';
import EmptyPage from '../EmptyPageFavorites';
import { Pagination } from '@mantine/core';
import { useState } from 'react';

const Favorites = () => {
  const [activePage, setActivePage] = useState(1);

  const savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
  const totalPages = savedItems.length / DEF_VAC;
  const startIndex = (activePage - 1) * DEF_VAC;
  const endIndex = startIndex + DEF_VAC;
  const displayedVacancies = savedItems.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };
  return (
    <div className="favorites">
      {savedItems.length === 0 ? (
        <EmptyPage />
      ) : (
        <>
          {displayedVacancies.map((el: Vacancy) => (
            <JobCard key={el.id} el={el} />
          ))}

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <Pagination
                total={totalPages}
                value={activePage}
                onChange={handlePageChange}
                size="sm"
                radius="sm"
                variant="outline"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
