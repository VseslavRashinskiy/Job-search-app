import { TextInput, Button } from '@mantine/core';
import { Search } from 'tabler-icons-react';

function SearchBar() {
  return (
    <TextInput
      radius="md"
      size="md"
      placeholder="Введите название вакансии"
      icon={<Search size="0.8rem" />}
      rightSection={
        <Button
          radius="sm"
          size="xs"
          style={{
            marginLeft: '-35px',
          }}
        >
          Поиск
        </Button>
      }
    />
  );
}

export default SearchBar;
