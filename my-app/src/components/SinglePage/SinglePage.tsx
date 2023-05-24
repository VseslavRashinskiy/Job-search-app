import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getAccessToken } from '../ResponseToken';
import axios from 'axios';
import JobCard from '../MainContent/JobCard';
import { Card } from '@mantine/core';
import {
  API_URL_VACANCIES,
  CLIENT_SECRET,
  SECRET_KEY,
  START_PROPERTY,
  Vacancy,
} from '../constants';

const SinglePage = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState<Vacancy>(START_PROPERTY);

  useEffect(() => {
    const fetchJobVacancies = async () => {
      const proxyUrl = `${API_URL_VACANCIES}${id}`;
      try {
        const accessToken = await getAccessToken();
        const response = await axios.get(proxyUrl, {
          headers: {
            'X-Api-App-Id': CLIENT_SECRET,
            'x-secret-key': SECRET_KEY,
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
