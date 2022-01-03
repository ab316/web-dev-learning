import Cats from 'components/hooks/Cats';
import Checkbox from 'components/hooks/Checkbox';
import DependencyArray from 'components/hooks/DependencyArray';
import WordCount from 'components/hooks/WordCount';

const Hooks = () => {
  return (
    <article style={{border: '1px solid #000', padding: '20px', marginBottom: '20px'}}>
      <header>
        <h1>Various Hooks</h1>
      </header>

      <h2>Checkbox (useEffect)</h2>
      <Checkbox />

      <h2>Use of Dependency Array (useEffect)</h2>
      <DependencyArray />

      <h3>Word Count</h3>
      <WordCount />

      <h3>Cats</h3>
      <Cats />
    </article>
  );
};

export default Hooks;
