import { TextInput, Button } from '@mantine/core';
import axios from 'axios';
import { Search } from 'tabler-icons-react';
import { getAccessToken } from '../ResponseToken';
import { DEF_VAC, Vacancy } from '../constants';

interface SearchBarProps {
  handleFilteredJobs: (filteredJobs: Vacancy[]) => void;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  currentPage: number;
  handleApplyPage: (totalPages: number) => void;
}

function SearchBar({
  handleFilteredJobs,
  setLoader,
  setSearch,
  search,
  currentPage,
  handleApplyPage,
}: SearchBarProps) {
  const handleApplyFilter = async () => {
    const endpoint = 'https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/';
    const secretKey = 'GEU4nvd3rej*jeh.eqp';
    setLoader(false);

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
          keyword: search,
          page: currentPage,
          count: DEF_VAC,
          payment_from: localStorage.getItem('SalaryFrom') ? localStorage.getItem('SalaryFrom') : 0,
          payment_to: localStorage.getItem('SalaryTo') ? localStorage.getItem('SalaryTo') : 0,
          catalogues: localStorage.getItem('Category')
            ? localStorage.getItem('Category')
            : undefined,
        },
      });
      setLoader(true);
      const filteredJobVacancies = response.data;
      handleApplyPage(filteredJobVacancies.total);
      handleFilteredJobs(filteredJobVacancies.objects);
    } catch (error) {
      setLoader(true);
    }
  };

  const handleSearchTerm = () => {
    handleApplyFilter();
    setSearch(search);
  };

  return (
    <TextInput
      data-elem="search-input"
      radius="md"
      size="md"
      placeholder="Введите название вакансии"
      icon={<Search size="0.8rem" />}
      value={search}
      onChange={(e) => setSearch(e.currentTarget.value)}
      rightSection={
        <Button
          data-elem="search-button"
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
