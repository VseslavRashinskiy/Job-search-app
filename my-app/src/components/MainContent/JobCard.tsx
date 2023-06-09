import { Card, Text, Avatar } from '@mantine/core';
import { Star, MapPin } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { JobCardProps, Vacancy } from '../constants';

const JobCard = ({ el }: JobCardProps) => {
  const [isEdit, setIsEdit] = useState(el.favorite);

  useEffect(() => {
    const storageItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
    const isSaved = storageItems.some((item: Vacancy) => item.id === el.id);
    setIsEdit(isSaved);
  }, [el.id]);

  const handleStarClick = () => {
    const storageItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
    const updatedItems = isEdit
      ? storageItems.filter((item: Vacancy) => item.id !== el.id)
      : [...storageItems, el];
    localStorage.setItem('savedItems', JSON.stringify(updatedItems));

    setIsEdit(!isEdit);
  };

  return (
    <Card
      data-elem={`vacancy-${el.id}`}
      padding="lg"
      shadow="sm"
      radius="md"
      style={{ margin: '16px 0' }}
    >
      <div className="solo-card">
        <Link to={`/${el.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="info-card">
            <Text
              size="lg"
              weight={600}
              style={{
                fontFamily: 'Inter',
                fontSize: '20px',
                lineHeight: '24px',
                color: '#5E96FC',
              }}
            >
              {el.profession}
            </Text>
            <div className="property-vacancy">
              {el.payment_from === 0 ? (
                <Text size="sm" weight={700}>
                  з/п Договорная
                </Text>
              ) : (
                <Text size="sm" weight={700}>
                  з/п от {el.payment_from} {el.currency}
                </Text>
              )}

              <Text
                size="sm"
                weight={700}
                style={{
                  color: 'gray',
                  margin: '0 12px',
                }}
              >
                •
              </Text>
              <Text size="sm">{el.type_of_work.title}</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MapPin size={14} style={{ marginRight: '4px' }} />
              <Text size="sm">{el.town.title}</Text>
            </div>
          </div>
        </Link>
        <button
          data-elem={`vacancy-${el.id}-shortlist-button`}
          onClick={handleStarClick}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Avatar
            size="xs"
            radius="sm"
            style={{
              backgroundColor: 'transparent',
              transition: 'color 0.3s',
            }}
          >
            <Star
              style={{
                color: isEdit ? '#5E96FC' : 'inherit',
                fill: isEdit ? '#5E96FC' : '',
              }}
            />
          </Avatar>
        </button>
      </div>
    </Card>
  );
};

export default JobCard;
