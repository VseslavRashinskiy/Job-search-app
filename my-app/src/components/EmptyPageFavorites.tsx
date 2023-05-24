import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const EmptyPage = () => {
  return (
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
  );
};
export default EmptyPage;
