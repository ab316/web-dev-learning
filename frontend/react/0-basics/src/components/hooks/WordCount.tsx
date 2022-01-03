import {useCallback} from 'react';
import {useEffect, useState, useMemo, Children} from 'react';

/*
This file shows the use of the useMemo hook
Check the MainComponent, then the WordCount
*/

const MainComponent = () => {
  const [val, setVal] = useState('');

  // This causes the component to render on every key press in the browser
  // useAnyKeyToRender();
  // This effect is invoked on each render
  // useEffect(() => {
  //   console.log('fresh render');
  // });

  const word = 'gnar';
  // This effect is invoked only when the word variable is changed (and on first render)
  // since word is constant of a primitive type (string), the effect is invoked only once
  // useEffect(() => {
  //   console.log('fresh render');
  // }, [word]);

  const words = ['gnar', 'sick'];
  // If, instead of a primitive type, we use an array, the effect is invoked on every render
  // Both variables word and words are re-created on each render.
  // For the primitive string type, JS takes the new string as the same as the old.
  // But for arrays, a new array is instantiated and JS assumes that it is a different object
  // and invokes the effect. Declaring the array outside the component would solve the
  // problem but that is not always a possible option (the WordCount component)
  // useEffect(() => {
  //   console.log('fresh render');
  // }, [words]);

  const fn = () => {
    console.log('hello world');
  };

  // Similary, the function fn is also re-created on each render and the below effect
  // is then invoked on each render. It should only be invoked when the function fn is
  // updated
  // useEffect(() => {
  //   fn();
  // }, [fn]);

  return (
    <>
      <input type="text" value={val} placeholder="Type something here" onChange={(e) => setVal(e.target.value)} />
      <WordCount input={val} />
    </>
  );
};

// Start by checking MainComponent
const WordCount = ({input = ''}) => {
  useAnyKeyToRender();

  const words = input.split(' ');

  // Here we can not move the input variable outside the component as it comes via the props
  // and this effect is invokes on every render even though the input is unchanged
  // useEffect(() => {
  //   console.log('Word count - fresh render words');
  // }, [words]);

  // The useMemo hook memoizes the return value of the given function and only calculates
  // it again when the value of a dependency changes
  // Here, the words are calculated again only when the "input" variable is changed
  // (And on the first render, ofcourse)
  // useMemo is only for performance optimization, so the code can not rely on the value
  // not being calculated without a change in a dependency
  const wordsMemo = useMemo(() => input.split(' '), [input]);
  useEffect(() => {
    console.log('Word count - fresh render');
  }, [wordsMemo]);

  // useCallback hook is memoization for functions. This hook will be invoked only
  // on first render
  const fn = useCallback(() => {
    console.log('hello world');
  }, []);

  // the effect now works properly and is only invoked on first render
  useEffect(() => {
    fn();
  }, [fn]);

  return (
    <>
      <p>{input}</p>
      <strong>{wordsMemo.length}</strong> - words
    </>
  );
};

const useAnyKeyToRender = () => {
  const [forceRenderState, setForceRender] = useState(false);

  useEffect(() => {
    const listener = function () {
      setForceRender(!forceRenderState);
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [forceRenderState]);
};

export default MainComponent;
