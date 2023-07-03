import {User, useGetMe} from '../graphql/operations';

let user;

export default function useUser(): User | null {
  const {data, loading, error} = useGetMe({
    fetchPolicy: 'network-only',
  });
  if (loading || error) {
    return null;
  }
  return data?.getMe || null;
}
