import {useInput, useIterator, useMountedRef} from 'hooks';
import {FC, useCallback, useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {Fetch} from './Fetch';

const AUTH_HEADERS = {
  // Generate a Personal Access Token in Github and store it in a .env file as a variable
  Authorization: `token ${process.env['REACT_APP_GITHUB_PAT']}`,
};

// This version of the Github User component uses parallel requests. All requests for the data are sent
// at once. It requires structuring the components in a different way. Instead of nesting the request making components
// they are moved at the same level.
const ParallelGithubUser = () => {
  const [userName, reset] = useInput('');
  const [login, setLogin] = useState('');
  const [repoName, setRepoName] = useState('');

  const handleSearch = () => {
    if (userName.value) {
      setLogin(userName.value);
    } else {
      setLogin('');
    }
    setRepoName('');
  };

  return (
    <>
      <div>
        <input type="text" placeholder="Github username" {...userName} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {login && <User login={login} />}
      {login && <UserRepositories login={login} onSelect={setRepoName} selected={repoName} />}
      {login && repoName && <RepositoryReadme login={login} repoName={repoName} />}
    </>
  );
};

// Using Fetch component abstraction along with Repositories renders using custom iterator hook
const User: FC<{login: string}> = ({login}) => {
  return <Fetch uri={`https://api.github.com/users/${login}`} headers={AUTH_HEADERS} renderSuccess={UserDetail} />;
};

const UserDetail = ({data}: {data: Record<string, string>}) => {
  if (!data['login']) return null;
  return (
    <>
      <div>
        <img src={data['avatar_url']} width="100px" alt={data.login} />
        <h1>{data['login']}</h1>
        <p>{data.name}</p>
        <p>{data['location']}</p>
      </div>
    </>
  );
};

const UserRepositories = ({
  login,
  selected,
  onSelect = (f) => f,
}: {
  login: string;
  selected?: string;
  onSelect?: (repoName: string) => void;
}) => {
  const render = ({data}: {data: IRepo[]}) => (
    <>{Array.isArray(data) && <RepoMenu repositories={data} selected={selected} onSelect={onSelect} />}</>
  );

  return <Fetch uri={`https://api.github.com/users/${login}/repos`} headers={AUTH_HEADERS} renderSuccess={render} />;
};

const RepoMenu = ({
  repositories,
  selected,
  onSelect = (f) => f,
}: {
  repositories: IRepo[];
  selected?: string;
  onSelect?: (repoName: string) => void;
}) => {
  const selectedIndex = Math.max(
    0,
    repositories.findIndex((r) => r.name === selected),
  );
  const [repo, prev, next] = useIterator(repositories, selected ? selectedIndex : 0);

  useEffect(() => {
    if (!repo || !repo.name) return;
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

const RepositoryReadme = ({login, repoName}: {login: string; repoName: string}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [markdown, setMarkdown] = useState('');
  const mounted = useMountedRef();

  const loadReadme = useCallback(async (login: string, repoName: string) => {
    setLoading(true);
    const uri = `https://api.github.com/repos/${login}/${repoName}/readme`;
    const {download_url} = await (await fetch(uri, {headers: AUTH_HEADERS})).json();
    // We come here after the request finishes. The component could have been dismounted
    // by then (on a slow net the user makes a new search with an empty string).
    if (!mounted.current) return;
    if (download_url) {
      const markdown = await (await fetch(download_url)).text();
      setMarkdown(markdown);
      setLoading(false);
      setError(undefined);
    } else {
      setLoading(false);
      setError(new Error('No such user/repository/readme'));
      setMarkdown('');
    }
  }, []);

  useEffect(() => {
    if (!login || !repoName) return;
    loadReadme(login, repoName).catch(setError);
  }, [login, repoName]);

  if (error) return <pre>{error.toString()}</pre>;

  if (loading) return <p>Loading readme...</p>;
  if (markdown) return <ReactMarkdown>{markdown}</ReactMarkdown>;
  return null;
};

interface IRepo {
  id: number;
  name: string;
  description?: string;
  private: boolean;
}

export default ParallelGithubUser;
