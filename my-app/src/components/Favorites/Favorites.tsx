import { Link } from 'react-router-dom';
import JobCard from '../MainContent/JobCard';
import { Button } from '@mantine/core';
import { Vacancy } from '../constants';

const Favorites = () => {
  const savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '65vh',
      }}
    >
      {savedItems.length === 0 ? (
        <div className="empty">
          <img src="https://i.ibb.co/6wLjq3X/Frame.png" alt="search" />
          <p
            style={{
              fontSize: '24px',
              lineHeight: '29px',
              color: '#343A40',
              fontWeight: '700',
            }}
          >
            Упс, здесь еще ничего нет!
          </p>
          <Link to="/">
            <Button style={{ color: '#3B7CD3', background: '#DEECFF' }} radius="md">
              Поиск Вакансий
            </Button>
          </Link>
        </div>
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
