import React from 'react';
import {useSearchProducts} from '../../graphql/operations';
import SearchResultMap from '../../components/map/search-result-map';
import {MainTabStackScreenProps} from '../../navigation/types';

export default function MapScreen({route}: MainTabStackScreenProps<'map'>) {
  const {params} = route;
  console.log('MapScreen', JSON.stringify(params));
  const {data, loading, error} = useSearchProducts({
    variables: {
      filter: {
        carType: null,
        categoryId: null,
        date: null,
        time: null,
      },
    },
    fetchPolicy: 'network-only',
  });

  console.log('search data: ', data, loading, error);
  return <SearchResultMap products={data?.searchProducts || []} />;
}
