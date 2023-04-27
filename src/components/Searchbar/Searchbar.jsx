import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import { toastConfig } from 'services/utils';
import {
  Header,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSearchSubmit }) => {
  const [searchValue, setValue] = useState('');

  const handleQueryChange = event => {
    setValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchValue.trim() === '') {
      toast.error('Enter a valid query', toastConfig);
      return;
    }
    onSearchSubmit(searchValue);
    setValue('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <FiSearch style={{ width: 20, height: 20 }} />
          <SearchButtonLabel>Search</SearchButtonLabel>
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleQueryChange}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};
