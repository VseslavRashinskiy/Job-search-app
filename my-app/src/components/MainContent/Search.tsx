import { TextInput, Button } from '@mantine/core';
import axios from 'axios';
import { Search } from 'tabler-icons-react';
import { getAccessToken } from '../ResponseToken';
import {
  API_URL_VACANCIES,
  CLIENT_SECRET,
  DEF_VAC,
  SECRET_KEY,
  SearchBarProps,
} from '../constants';

function SearchBar({
  handleFilteredJobs,
  setLoader,
  setSearch,
  search,
  currentPage,
  handleApplyPage,
}: SearchBarProps) {
  const handleApplyFilter = async () => {
    setLoader(false);

    try {
      const accessToken = await getAccessToken();

      const response = await axios.get(API_URL_VACANCIES, {
        headers: {
          'X-Api-App-Id': CLIENT_SECRET,
          'x-secret-key': SECRET_KEY,
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
            backgroundColor: '#5E96FC',
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
