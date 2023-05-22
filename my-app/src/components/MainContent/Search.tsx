import { TextInput, Button } from '@mantine/core';
import { useState } from 'react';
import { Search } from 'tabler-icons-react';

interface SearchBarProps {
  handleSearch: (query: string) => void;
}

function SearchBar({ handleSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchTerm = () => {
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
