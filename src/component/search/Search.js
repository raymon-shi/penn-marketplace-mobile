import React, { useState } from 'react';
import { Center, ScrollView } from 'native-base';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SearchPagination from './SearchPagination';
import BottomRow from './BottomRow';

const Search = () => {
  const [searchBarText, setSearchBarText] = useState('');
  const [filterType, setFilterType] = useState('');
  return (
    <ScrollView>
      <Center style={{ justifyContent: 'space-between' }}>
        <SearchBar searchBar={searchBarText} setSearchBar={setSearchBarText} filterType={filterType} setFilterType={setFilterType} />
        <SearchResults />
        <SearchPagination />
      </Center>
      <BottomRow />
    </ScrollView>
  );
};

export default Search;
