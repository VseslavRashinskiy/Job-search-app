import { TextInput, Button } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import { Search } from 'tabler-icons-react';
import { getAccessToken } from '../ResponseToken';
import { Vacancy } from '../Main';

interface SearchBarProps {
  handleSearch: (query: string) => void;
  handleFilteredJobs: (filteredJobs: Vacancy[]) => void;
}

function SearchBar({ handleSearch, handleFilteredJobs }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleApplyFilter = async () => {
    const endpoint = 'https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/';
    const secretKey = 'GEU4nvd3rej*jeh.eqp';

    try {
      const accessToken = await getAccessToken();

      const response = await axios.get(endpoint, {
        headers: {
          'X-Api-App-Id':
            'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
          'x-secret-key': secretKey,
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          published: 1,
          keyword: searchQuery,
          payment_from: localStorage.getItem('SalaryFrom') ? localStorage.getItem('SalaryFrom') : 0,
          payment_to: localStorage.getItem('SalaryTo') ? localStorage.getItem('SalaryTo') : 0,
          catalogues: localStorage.getItem('Category')
            ? localStorage.getItem('Category')
            : undefined,
        },
      });

      const filteredJobVacancies = response.data;
      handleFilteredJobs(filteredJobVacancies.objects);
    } catch (error) {}
  };

  const handleSearchTerm = () => {
    handleApplyFilter();
    handleSearch(searchQuery);
  };

  return (
    <TextInput
      radius="md"
      size="md"
      placeholder="Введите название вакансии"
      icon={<Search size="0.8rem" />}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.currentTarget.value)}
      rightSection={
        <Button
          radius="sm"
          size="xs"
          style={{
            marginLeft: '-35px',
          }}
          onClick={handleSearchTerm}
        >
          Поиск
        </Button>
      }
    />
  );
}

export default SearchBar;
