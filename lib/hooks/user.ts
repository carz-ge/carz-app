import {useAuthorize, useGetMe, User} from '../../graphql/operations';

let user;

export default function useUser(): User | null {
  const {data, loading, error} = useGetMe({
    fetchPolicy: 'cache-and-network',
  });
  if (loading || error) {
    return null;
  }
  return data?.getMe || null;
}
