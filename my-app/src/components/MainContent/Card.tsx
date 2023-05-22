import { Card, Text, Avatar } from '@mantine/core';
import { Star, MapPin } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { Vacancy } from '../Main';

interface JobCardProps {
  el: Vacancy;
}

const JobCard = ({ el }: JobCardProps) => {
  return (
    <Link to={`/${el.id}`} style={{ textDecoration: 'none' }}>
      <Card padding="lg" shadow="sm" radius="md" style={{ margin: '16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '4px',
                justifyContent: 'space-between',
              }}
            >
              {el.payment_from === 0 ? (
                <Text size="sm" weight={700}>
                  з/п Договорная
                </Text>
              ) : (
                <Text size="sm" weight={700}>
                  з/п от {el.payment_from}
                </Text>
              )}

              <Text
                size="sm"
                weight={700}
                style={{
                  color: 'gray',
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
          <Avatar size="xs" radius="sm" style={{ backgroundColor: 'transparent' }}>
            <Star />
          </Avatar>
        </div>
      </Card>
    </Link>
  );
};

export default JobCard;
