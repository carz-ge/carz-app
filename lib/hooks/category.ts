import {Category, useListCategories} from '../../graphql/operations';

export default function useCategories(): Category[] {
  const {data, loading, error} = useListCategories({
    fetchPolicy: 'network-only',
  });
  if (loading || error) {
    return [];
  }
  return data?.listCategories || [];
}
