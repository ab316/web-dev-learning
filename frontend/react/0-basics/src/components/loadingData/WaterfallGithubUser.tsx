import {useIterator} from 'hooks';
import {FC, useCallback, useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {Fetch} from './Fetch';

// This version of GitHub User component uses waterfall requests to fetch the data:
// The requests are made one after another as the components are rendered
const WaterfallGithubUser = () => {
  return (
    <>
      <User login="ab316" />
    </>
  );
};

// Using Fetch component abstraction along with Repositories renders using custom iterator hook
const User: FC<{login: string}> = ({login}) => {
  return <Fetch uri={`https://api.github.com/users/${login}`} renderSuccess={UserDetail} />;
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
      <UserRepositories login={data.login} onSelect={(repoName) => console.log(`${repoName} selected`)} />
    </>
  );
};

const UserRepositories = ({login, onSelect = (f) => f}: {login: string; onSelect?: (repoName: string) => void}) => {
  const render = ({data}: {data: IRepo[]}) => <RepoMenu login={login} repositories={data} onSelect={onSelect} />;
  return <Fetch uri={`https://api.github.com/users/${login}/repos`} renderSuccess={render} />;
};

const RepoMenu = ({
  login,
  repositories,
  onSelect = (f) => f,
}: {
  login: string;
  repositories: IRepo[];
  onSelect?: (repoName: string) => void;
}) => {
  const [repo, prev, next] = useIterator(repositories);

  useEffect(() => {
    if (!repo.name) return;
    onSelect(repo.name);
  }, [repo]);

  if (!login && !repo) return null;

  return (
    <>
      <div style={{display: 'flex', width: '25%', minWidth: '400px', justifyContent: 'space-between'}}>
        <button onClick={prev}>&lt;</button>
        <p style={{textAlign: 'center'}}>{repo?.name}</p>
        <button onClick={next}>&gt;</button>
      </div>
      <RepositoryReadme login={login} repoName={repo.name} />
    </>
  );
};

const RepositoryReadme = ({login, repoName}: {login: string; repoName: string}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [markdown, setMarkdown] = useState('');

  const loadReadme = useCallback(async (login: string, repoName: string) => {
    setLoading(true);
    const uri = `https://api.github.com/repos/${login}/${repoName}/readme`;
    const {download_url} = await (await fetch(uri)).json();
    const markdown = await (await fetch(download_url)).text();
    setMarkdown(markdown);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!login || !repoName) return;
    loadReadme(login, repoName).catch(setError);
  }, [login, repoName]);

  if (error)
    return (
      <pre>
        {error.toString()}
        {error.stack}
      </pre>
    );

  if (loading) return <p>Loading readme...</p>;
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
};

interface IRepo {
  id: number;
  name: string;
  description?: string;
  private: boolean;
}

export default WaterfallGithubUser;
