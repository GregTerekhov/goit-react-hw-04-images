import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
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
    onSearchSubmit(searchValue);
    setValue('');
  };

  return (
    <Header onSubmit={handleSubmit}>
      <SearchForm>
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
