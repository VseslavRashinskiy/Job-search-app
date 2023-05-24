import { Card, NativeSelect, NumberInput, Button } from '@mantine/core';
import { ChevronDown, X } from 'tabler-icons-react';
import { fetchJobCategories, getAccessToken } from '../ResponseToken';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  API_URL_VACANCIES,
  CLIENT_SECRET,
  Categories,
  DEF_VAC,
  FilterCardProps,
  REMOVE_CATEGORY,
  REMOVE_SALARY_FROM,
  REMOVE_SALARY_TO,
  SECRET_KEY,
} from '../constants';

const FilterCard = ({ handleFilteredJobs, search, setLoader, setSearch }: FilterCardProps) => {
  const [jobCategories, setJobCategories] = useState<Categories[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<number | undefined>(undefined);
  const [selectedSalaryFrom, setSelectedSalaryFrom] = useState<number | ''>(0);
  const [selectedSalaryTo, setSelectedSalaryTo] = useState<number | ''>(0);

  useEffect(() => {
    fetchJobCategories()
      .then((categories) => {
        setJobCategories(categories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
          count: DEF_VAC,
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
    REMOVE_CATEGORY;
    REMOVE_SALARY_FROM;
    REMOVE_SALARY_TO;
    setSearch('');
    setSelectedIndustry(undefined);
    setSelectedSalaryFrom(0);
    setSelectedSalaryTo(0);
  };

  return (
    <Card className="filters" shadow="sm" padding="md" radius="md">
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
          data-elem="industry-select"
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
            data-elem="salary-from-input"
            placeholder="От"
            min={0}
            max={100000}
            style={{ marginBottom: '8px' }}
            value={selectedSalaryFrom}
            onChange={handleSalaryFromChange}
          />

          <NumberInput
            id="salaryTo"
            data-elem="salary-to-input"
            placeholder="До"
            min={0}
            max={100000}
            value={selectedSalaryTo}
            onChange={handleSalaryToChange}
          />
        </div>
      </div>
      <Button
        className="button"
        data-elem="search-button"
        onClick={handleApplyFilter}
        variant="filled"
        fullWidth
      >
        Применить
      </Button>
    </Card>
  );
};

export default FilterCard;
