import {useReducer} from 'react';
import {useEffect, useState} from 'react';

const Checkbox = () => {
  // Hooks are always executed in the same order. so [checked, useEffect] in this case
  const [checked, setChecked] = useState(false);

  // useEffect is used to cause side-effects when a render happens
  // things we want the component to do other than rendering are called effects
  // on every render, useEffect has access to the latest values of states, props, refs, etc
  // from that render
  useEffect(() => {
    // alert(`checked: ${checked}`);
    console.log(`checked: ${checked}`);
  });

  return (
    <>
      <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
      {checked ? 'checked' : 'not checked'}
    </>
  );
};

const CheckboxReducerVersion = () => {
  // reducer is used for complex statement management
  const [checked, toggle] = useReducer((checked) => !checked, false);

  useEffect(() => {
    console.log(`checked: ${checked}`);
  });

  return (
    <>
      <input type="checkbox" checked={checked} onChange={toggle} />
      {checked ? 'checked' : 'not checked'}
    </>
  );
};

export default CheckboxReducerVersion;
