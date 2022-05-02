import { Center, Heading, VStack } from 'native-base';
import React from 'react';
import data from './data/index';
import ResultCard from './ResultCard';

const SearchResults = () => (
  <VStack space={4} alignItems="center" w="100%">
    <Heading>{`${data.length} results for Elden Ring`}</Heading>
    {data.map((result) => (
      <ResultCard
        key={`${result.title} ${result.lister} ${result.image}`}
        title={result.title}
        price={result.price}
        lister={result.lister}
        image={result.image}
      />
    ))}
  </VStack>
);

export default SearchResults;
