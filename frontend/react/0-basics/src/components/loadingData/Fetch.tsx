import {useFetch} from 'hooks';

interface Props<T> {
  uri: string;
  headers?: Record<string, string>;
  loadingFallback?: JSX.Element;
  renderSuccess: ({data}: {data: T}) => JSX.Element | null;
  renderError?: (error: Error) => JSX.Element | null;
}

export const Fetch = <T,>({
  uri,
  headers = {},
  renderSuccess,
  loadingFallback = <p>Loading...</p>,
  renderError = (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
}: Props<T>) => {
  const {data, loading, error} = useFetch<T>(uri, headers);

  if (loading) return loadingFallback;
  if (error) return renderError(error);
  if (data) return renderSuccess({data});
  return null;
};
