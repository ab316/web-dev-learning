import {useFetch} from 'hooks';

interface Props<T> {
  uri: string;
  loadingFallback?: JSX.Element;
  renderSuccess: ({data}: {data: T}) => JSX.Element;
  renderError?: (error: Error) => JSX.Element;
}

export const Fetch = <T,>({
  uri,
  renderSuccess,
  loadingFallback = <p>Loading...</p>,
  renderError = (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
}: Props<T>) => {
  const {data, loading, error} = useFetch<T>(uri);

  if (loading) return loadingFallback;
  if (error) return renderError(error);
  if (data) return renderSuccess({data});
  return null;
};
