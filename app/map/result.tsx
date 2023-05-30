import React from 'react';
import {StyleSheet} from 'react-native';
import {CarType, useSearchProducts} from '../../graphql/operations';
import {useSearchParams} from 'expo-router';
import SearchResultMap from '../../components/map/search-result-map';

export default function Result() {
  const params = useSearchParams();
  console.log('MapResult', JSON.stringify(params));
  const {data, loading, error} = useSearchProducts({
    variables: {
      filter: {
        carType: params.carType as CarType,
        categoryId: params.categoryId as string,
        date: params.date as string,
        time: params.time as string,
      },
    },
    fetchPolicy: 'cache-first',
    initialFetchPolicy: 'network-only',
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
