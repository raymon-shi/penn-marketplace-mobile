import React, { useState } from 'react';
import { Center, ScrollView, View } from 'native-base';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SearchPagination from './SearchPagination';
import BottomRow from './BottomRow';

const Search = () => {
  const [searchBarText, setSearchBarText] = useState('');
  const [filterType, setFilterType] = useState('');
  return (
    <View style={{ flex:1, padding: 60 }}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Center style={{ justifyContent: 'space-between' }}>
          <SearchBar searchBar={searchBarText} setSearchBar={setSearchBarText} filterType={filterType} setFilterType={setFilterType} />
          <SearchResults />
          <SearchPagination />
        </Center>
        <BottomRow />
      </ScrollView>
    </View>
  );
};

export default Search;
