import JobCard from '../MainContent/JobCard';
import { DEF_VAC, Vacancy } from '../constants';
import EmptyPage from '../EmptyPage/EmptyPage';
import { Button, Pagination } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [activePage, setActivePage] = useState(1);

  const savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
  const totalPages = Math.ceil(savedItems.length / DEF_VAC);
  const startIndex = (activePage - 1) * DEF_VAC;
  const endIndex = startIndex + DEF_VAC;
  const displayedVacancies = savedItems.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };
  return (
    <div className="favorites">
      {savedItems.length === 0 ? (
        <div>
          <EmptyPage />
          <Link to="/">
            <Button style={{ color: '#3B7CD3', background: '#DEECFF' }} radius="md">
              Поиск Вакансий
            </Button>
          </Link>
        </div>
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
                size="md"
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
