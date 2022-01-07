import {useFetch, useIterator} from 'hooks';
import {FC, useCallback, useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {Fetch} from './Fetch';

const loadJSON = (key: string) => {
  if (key) {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
  }
  return null;
};
const saveJSON = (key: string, data: unknown) => localStorage.setItem(key, JSON.stringify(data));

// Minimal data loading
const User1: FC<{login: string}> = ({login}) => {
  const [data, setData] = useState(loadJSON(`user:${login}`));

  useEffect(() => {
    if (!login) return;
    if (data && data.login == login) return;

    console.log(`Fetching github data for ${login}`);
    fetch(`https://api.github.com/users/${login}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        const {name, login: dataLogin, avatar_url, location} = res;
        saveJSON(`user:${login}`, {name, login: dataLogin, avatar_url, location});
      })
      .catch(console.error);
  }, [login]);

  return (
    <>
      <pre>{data && JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

const User2: FC<{login: string}> = ({login}) => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!login) return;
    setLoading(true);

    console.log(`Fetching github data for ${login}`);
    fetch(`https://api.github.com/users/${login}`)
      .then((res) => res.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [login]);

  if (error) return <pre>Error: {error.toString()}</pre>;
  if (loading) return <h2>Loading...</h2>;
  if (!data) return null;

  return (
    <>
      <img src={data['avatar_url']} width="100px" alt={data.login} />
      <h1>{data.login}</h1>
      <p>{data.name}</p>
      <p>{data.location}</p>
    </>
  );
};

// Using Custom useFetch hook
const User3: FC<{login: string}> = ({login}) => {
  const {data, loading, error} = useFetch<Record<string, string>>(`https://api.github.com/users/${login}`);

  if (error) return <pre>Error: {error.toString()}</pre>;
  if (loading) return <h2>Loading...</h2>;
  if (!data) return null;

  return (
    <>
      <img src={data['avatar_url']} width="100px" alt={data.login} />
      <h1>{data['login']}</h1>
      <p>{data.name}</p>
      <p>{data['location']}</p>
    </>
  );
};

const GithubUser = () => {
  return (
    <>
      <User3 login="ab316" />
    </>
  );
};

export default GithubUser;
