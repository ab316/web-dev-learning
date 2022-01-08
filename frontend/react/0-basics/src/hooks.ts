import React, {useCallback, useEffect, useMemo, useState} from 'react';

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setValue(e.target.value);
  return [{value, onChange: onChange}, () => setValue(initialValue)] as const;
};

export function useFetch<T>(uri: string, headers?: Record<string, string>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uri) return;
    setLoading(true);

    fetch(uri, {headers: headers})
      .then((res) => res.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [uri]);

  return {loading, data, error};
}

// Hook to cycle through an array
export function useIterator<T>(items: T[], initialIndex = 0) {
  // console.log(items);
  const [i, setIndex] = useState(initialIndex);

  // Memoizing makes it easier for consumers to use these variables in their dependency arrays. This will avoid unnecessary renders
  const prev = useCallback(() => {
    if (i === 0) return setIndex(items.length - 1);
    setIndex(i - 1);
  }, [i]);

  const next = useCallback(() => {
    if (i === items.length - 1) return setIndex(1);
    setIndex(i + 1);
  }, [i]);

  const item = useMemo(() => items[i], [i]);

  return [item || items[i], prev, next] as const;
}
