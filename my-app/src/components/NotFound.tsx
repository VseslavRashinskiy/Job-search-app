import { Link } from 'react-router-dom';
import EmptyPage from './EmptyPage/EmptyPage';
import { Button } from '@mantine/core';

const NotFound = () => {
  return (
    <div>
      <EmptyPage />
      <Link to="/">
        <Button style={{ color: '#3B7CD3', background: '#DEECFF' }} radius="md">
          Поиск Вакансий
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
