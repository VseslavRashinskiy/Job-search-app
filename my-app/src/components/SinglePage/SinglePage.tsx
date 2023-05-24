import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getAccessToken } from '../ResponseToken';
import axios from 'axios';
import JobCard from '../MainContent/JobCard';
import { Card } from '@mantine/core';
import { START_PROPERTY, Vacancy } from '../constants';

const SinglePage = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState<Vacancy>(START_PROPERTY);

  useEffect(() => {
    const fetchJobVacancies = async () => {
      const proxyUrl = `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/${id}`;
      const secretKey = 'GEU4nvd3rej*jeh.eqp';
      try {
        const accessToken = await getAccessToken();
        const response = await axios.get(proxyUrl, {
          headers: {
            'X-Api-App-Id':
              'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
            'x-secret-key': secretKey,
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const vacancies = response.data;
        setVacancy(vacancies);
      } catch (error) {}
    };
    fetchJobVacancies();
  }, [id]);

  return (
    <div className="cards" data-testid="cards" style={{ maxWidth: '773px', margin: '0 auto' }}>
      <JobCard el={vacancy} />
      <Card padding="lg" shadow="sm" radius="md" style={{ margin: '16px 0', textAlign: 'start' }}>
        <div
          style={{ marginBottom: '16px' }}
          dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }}
        />
      </Card>
    </div>
  );
};

export default SinglePage;
