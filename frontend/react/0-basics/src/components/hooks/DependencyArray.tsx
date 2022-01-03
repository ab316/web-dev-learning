import {useEffect, useState} from 'react';

const DependencyArray = () => {
  const [val, setVal] = useState('');
  const [phrase, setPhrase] = useState('Example phrase');

  const createPhrase = () => {
    setPhrase(val);
    setVal('');
  };

  // These two effects will be invoked on every render (on every keystroke)
  // We don't want that the second effect should only invoked when the button is clicked
  // useEffect(() => {
  //   console.log(`typing ${val}`);
  // });
  // useEffect(() => {
  //   console.log(`save phrase ${phrase}`);
  // });

  // With dependency array, the first effect is only invoked when val changes
  // the second effect is only invoked when phrase changes (on button click)
  // We can provide multiple values in the array
  useEffect(() => {
    console.log(`typing ${val}`);
  }, [val]);
  useEffect(() => {
    console.log(`save phrase ${phrase}`);
  }, [phrase]);
  // An effect with an empty dependency array is only called after initial render
  // Such effects are useful for initialization
  useEffect(() => {
    console.log(`Only once after initial render`);
  }, []);

  useEffect(() => {
    console.log(`Welcome!`);
    // A function returned from the effect is invoked when the component is removed
    // from the DOM tree. So we can add cleanup on teardown in this function
    return () => console.log('Good bye');
  }, []);

  return (
    <>
      <label htmlFor="">Favorite Phrase:</label>
      <input type="text" value={val} placeholder={phrase} onChange={(e) => setVal(e.target.value)} />
      <button onClick={createPhrase}>Make Phrase</button>
    </>
  );
};

export default DependencyArray;
