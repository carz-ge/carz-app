import React from 'react';
import {useSearchProducts} from '../../graphql/operations';
import SearchResultMap from '../../components/map/search-result-map';
import {MainTabStackScreenProps} from '../../navigation/types';
import {useAppSelector} from '../../store/hooks';
import {
  selectCarType,
  selectDate,
  selectTime,
} from '../../store/slice/searchSlice';

export default function MapScreen({route}: MainTabStackScreenProps<'map'>) {
  const {params} = route;
  const selectedDate = useAppSelector(selectDate);
  const selectedTime = useAppSelector(selectTime);
  const selectedCarType = useAppSelector(selectCarType);
  const categoryId = params?.categoryId || null;
  console.log(
    'MapScreen',
    JSON.stringify(params),
    selectedDate,
    selectedTime,
    selectedCarType,
    categoryId,
  );

  const {data, loading, error} = useSearchProducts({
    variables: {
      filter: {
        carType: selectedCarType,
        categoryId: categoryId,
        date: selectedDate,
        time: selectedTime,
      },
    },
    fetchPolicy: 'network-only',
  });

  console.log('search data: ', data, loading, error);
  return <SearchResultMap products={data?.searchProducts || []} />;
}
