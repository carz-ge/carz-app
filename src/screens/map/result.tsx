import React from 'react';
import {StyleSheet} from 'react-native';
import {useSearchProducts} from '../../graphql/operations';
import SearchResultMap from '../../components/map/search-result-map';
import {RootStackScreenProps} from '../../navigation/types';

export default function ResultMapScreen({route}: RootStackScreenProps<'map'>) {
  const {params} = route;
  console.log('MapResult', JSON.stringify(params));
  const {data, loading, error} = useSearchProducts({
    variables: {
      filter: {
        carType: params.carType,
        categoryId: params.categoryId,
        date: params.date,
        time: params.time,
      },
    },
    fetchPolicy: 'network-only',
  });

  console.log('search data: ', data, loading, error);
  return <SearchResultMap products={data?.searchProducts || []} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
