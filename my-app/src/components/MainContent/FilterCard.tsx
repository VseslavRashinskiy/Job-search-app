import { Card, NativeSelect, NumberInput, Button } from '@mantine/core';
import { ChevronDown, X } from 'tabler-icons-react';

const FilterCard = () => {
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
          data={['IT', 'Sales', 'Design', 'Marketing']}
          placeholder="Выберите отрасль"
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
          />
          <NumberInput id="salaryTo" placeholder="До" min={0} max={100000} />
        </div>
      </div>
      <Button variant="filled" fullWidth>
        Применить
      </Button>
    </Card>
  );
};

export default FilterCard;
