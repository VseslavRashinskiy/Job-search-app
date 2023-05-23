import { Card, NativeSelect, NumberInput, Button } from '@mantine/core';
import { ChevronDown, X } from 'tabler-icons-react';
import { getAccessToken } from '../ResponseToken';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Vacancy } from '../Main';
export interface Categories {
  key: number;
  title: string;
}
interface FilterCardProps {
  handleFilteredJobs: (filteredJobs: Vacancy[]) => void;
  search: string;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const FilterCard = ({ handleFilteredJobs, search, setLoader, setSearch }: FilterCardProps) => {
  const [jobCategories, setJobCategories] = useState<Categories[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<number | undefined>(undefined);
  const [selectedSalaryFrom, setSelectedSalaryFrom] = useState<number | ''>(0);
  const [selectedSalaryTo, setSelectedSalaryTo] = useState<number | ''>(0);

  useEffect(() => {
    const fetchJobCategories = async () => {
      const proxyUrl = 'https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/';
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

        const categories = response.data;
        setJobCategories(categories);
      } catch (error) {}
    };
    fetchJobCategories();
  }, []);

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
          payment_from: selectedSalaryFrom === '' ? 0 : selectedSalaryFrom,
          payment_to: selectedSalaryTo === '' ? 0 : selectedSalaryTo,
          catalogues: selectedIndustry !== undefined ? selectedIndustry : undefined,
        },
      });
      setLoader(true);
      const filteredJobVacancies = response.data;
      handleFilteredJobs(filteredJobVacancies.objects);
    } catch (error) {
      setLoader(true);
    }
  };

  const handleSalaryFromChange = (value: number | '') => {
    const parsedValue = value === '' ? 0 : parseInt(value.toString(), 10);
    setSelectedSalaryFrom(parsedValue);
    localStorage.setItem('SalaryFrom', parsedValue.toString());
  };

  const handleSalaryToChange = (value: number | '') => {
    const parsedValue = value === '' ? 0 : parseInt(value.toString(), 10);
    setSelectedSalaryTo(parsedValue);
    localStorage.setItem('SalaryTo', parsedValue.toString());
  };

  const handleSelectedCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = jobCategories.find(
      (category) => category.title === event.target.value
    );
    setSelectedIndustry(selectedCategory?.key || undefined);
    if (selectedCategory) {
      localStorage.setItem('Category', selectedCategory?.key.toString());
    }
  };

  const ResetSettings = () => {
    setSearch('');
    setSelectedIndustry(undefined);
    setSelectedSalaryFrom(0);
    setSelectedSalaryTo(0);
  };

  return (
    <Card
      shadow="sm"
      padding="md"
      radius="md"
      style={{
        maxHeight: '360px',
        maxWidth: '315px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxHeight: '20px',
        }}
      >
        <h3 style={{ margin: 0, fontWeight: 'bold', textAlign: 'left' }}>Фильтры</h3>
        <Button
          variant="link"
          style={{ padding: 0, color: '#ACADB9', alignItems: 'center', maxHeight: '20px' }}
          onClick={ResetSettings}
        >
          Сбросить все
          <X size={14} color={'#ACADB9'} />
        </Button>
      </div>
      <div style={{ textAlign: 'left' }}>
        <label htmlFor="industry" style={{ fontWeight: 'bold' }}>
          Отрасль
        </label>
        <NativeSelect
          style={{ marginTop: '8px' }}
          id="industry"
          data={jobCategories.map((el) => el.title)}
          placeholder="Выберите отрасль"
          value={
            selectedIndustry !== undefined
              ? jobCategories.find((category) => category.key === selectedIndustry)?.title
              : ''
          }
          onChange={handleSelectedCategory}
          rightSection={<ChevronDown size="1rem" />}
        />
      </div>
      <div
        style={{
          textAlign: 'left',
        }}
      >
        <label htmlFor="salaryFrom" style={{ fontWeight: 'bold' }}>
          Оклад
        </label>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '8px',
          }}
        >
          <NumberInput
            id="salaryFrom"
            placeholder="От"
            min={0}
            max={100000}
            style={{ marginBottom: '8px' }}
            value={selectedSalaryFrom}
            onChange={handleSalaryFromChange}
          />

          <NumberInput
            id="salaryTo"
            placeholder="До"
            min={0}
            max={100000}
            value={selectedSalaryTo}
            onChange={handleSalaryToChange}
          />
        </div>
      </div>
      <Button onClick={handleApplyFilter} variant="filled" fullWidth>
        Применить
      </Button>
    </Card>
  );
};

export default FilterCard;
