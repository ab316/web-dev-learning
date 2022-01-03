import {useInput} from 'hooks';
import {FC, memo, useCallback, useState} from 'react';

const Cat: FC<{name: string; meow?: (name: string) => void}> = ({
  name,
  meow = () => {
    void 0;
  },
}) => {
  console.log('rendering cat', name);
  return <p onClick={() => meow(name)}>{name}</p>;
};

// The Cat component is a pure component but it gets re-rendered everytime a new cat is
// added to the Cats component below. the memo functions creates a component that is only
// rendered when the props of Cat are changed
// memo works with a single argument if no function props are defined in the component,
// as function are re-created on each render, so they always change
const PureCat = memo(Cat);
// For component with function props, we can define the equality condition for the props
// ourselves
// const PureCat = memo(Cat, (prev, next) => prev.name == next.name);

const CreateCat: FC<{onClick: (cat: string) => void}> = ({onClick: createCat}) => {
  const [input, reset] = useInput('');
  return (
    <div>
      <input type="text" {...input} />
      <button onClick={() => createCat(input.value)}>Create Cat</button>
    </div>
  );
};

const Cats = () => {
  const [cats, setCats] = useState(['Biscuit', 'Jungle', 'Outlaw']);

  const createCat = (cat: string) => {
    setCats([...cats, cat]);
  };

  // instead of specifying the predicate for memo, we can also memoize the function used
  // as the prop. Then again only the new cat will be rendered
  const meow = useCallback((name) => console.log(`cat ${name} meows`), []);

  return (
    <div>
      {cats.map((name, i) => (
        // <Cat key={i} name={name} />
        // <PureCat key={i} name={name} />
        // <PureCat key={i} name={name} meow={(name) => console.log(`cat ${name} meows`)} />
        <PureCat key={i} name={name} meow={meow} />
      ))}

      <CreateCat onClick={createCat} />
    </div>
  );
};

export default Cats;
