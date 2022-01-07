import {useFetch, useIterator} from 'hooks';
import {FC, useEffect, useState} from 'react';
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

// Using Fetch component abstraction along with Repositories renders using custom iterator hook
const User4: FC<{login: string}> = ({login}) => {
  return <Fetch uri={`https://api.github.com/users/${login}`} renderSuccess={UserDetail} />;
};

const UserDetail = ({data}: {data: Record<string, string>}) => {
  return (
    <>
      <div>
        <img src={data['avatar_url']} width="100px" alt={data.login} />
        <h1>{data['login']}</h1>
        <p>{data.name}</p>
        <p>{data['location']}</p>
      </div>
      <UserRepositories login={data.login} onSelect={(repoName) => console.log(`${repoName} selected`)} />
    </>
  );
};

const UserRepositories = ({login, onSelect = (f) => f}: {login: string; onSelect?: (repoName: string) => void}) => {
  const render = ({data}: {data: IRepo[]}) => <RepoMenu repositories={data} onSelect={onSelect} />;
  return <Fetch uri={`https://api.github.com/users/${login}/repos`} renderSuccess={render} />;
};

const RepoMenu = ({
  repositories,
  onSelect = (f) => f,
}: {
  repositories: IRepo[];
  onSelect?: (repoName: string) => void;
}) => {
  const [repo, prev, next] = useIterator(repositories);

  useEffect(() => {
    if (!repo.name) return;
    onSelect(repo.name);
  }, [repo]);

  return (
    <div style={{display: 'flex', width: '25%', minWidth: '400px', justifyContent: 'space-between'}}>
      <button onClick={prev}>&lt;</button>
      <p style={{textAlign: 'center'}}>{repo?.name}</p>
      <button onClick={next}>&gt;</button>
    </div>
  );
};

const GithubUser = () => {
  return (
    <>
      <User4 login="ab316" />
    </>
  );
};

interface IRepo {
  id: number;
  name: string;
  description?: string;
  private: boolean;
}

export default GithubUser;
