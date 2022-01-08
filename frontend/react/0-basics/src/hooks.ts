import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setValue(e.target.value);
  return [{value, onChange: onChange}, () => setValue(initialValue)] as const;
};

export function useFetch<T>(uri: string, headers?: Record<string, string>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const mounted = useMountedRef();

  useEffect(() => {
    if (!uri || !mounted.current) return;
    setLoading(true);

    fetch(uri, {headers: headers})
      .then((data) => {
        if (!mounted.current) throw new Error('Component not mounted');
        return data;
      })
      .then((res) => res.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch((error) => {
        // Do not setError if the component has dismounted
        if (!mounted.current) return;
        setError(error);
      });
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

// Tells if a component is mounted or not
export function useMountedRef() {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  });
  return mounted;
}
