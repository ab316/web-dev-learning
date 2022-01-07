import GithubUser from 'components/loadingData/GithubUser';
import NonVirtualizedList from 'components/loadingData/VirtualizedList';
import WaterfallGithubUser from 'components/loadingData/WaterfallGithubUser';

const LoadingData = () => {
  return (
    <article style={{border: '1px solid #000', padding: '20px', marginBottom: '20px'}}>
      <h1>Data Loading</h1>

      <h2>Virtualized Lists</h2>
      <NonVirtualizedList />

      <h2>Github User</h2>
      <WaterfallGithubUser />
    </article>
  );
};

export default LoadingData;
