import {useInput} from 'hooks';
import React, {FC, useRef, useState} from 'react';
import {useColors} from './ColorProvider';

interface Props {
  onNewColor: (title: string, color: string) => void;
}

// Uncontrolled component version
export const AddColorFormNormalVersion: FC<Props> = ({onNewColor}) => {
  const txtTitle = useRef<HTMLInputElement>(null);
  const hexColor = useRef<HTMLInputElement>(null);

  const submit: React.FormEventHandler = (e) => {
    if (!txtTitle.current || !hexColor.current) return;

    e.preventDefault();
    const title = txtTitle.current.value;
    const color = hexColor.current.value;
    onNewColor(title, color);
    txtTitle.current.value = '';
    hexColor.current.value = '#000000';
  };

  return (
    <form onSubmit={submit}>
      <input type="text" ref={txtTitle} placeholder="color title...." />
      <input type="color" ref={hexColor} required />
      <button>Add</button>
    </form>
  );
};

// Controlled component version
// In controlled component, the component is rendered every time the form fields change
// So there should be no expensive operation in a controlled component
export const AddColorFormControlledVersion: FC<Props> = ({onNewColor}) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#000000');

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();
    onNewColor(title, color);
    setTitle('');
    setColor('#000000');
  };

  return (
    <form onSubmit={submit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="color title...." />
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} required />
      <button>Add</button>
    </form>
  );
};

// Controlled Component, Custom Hook version
export const AddColorFormCustomHookVersion: FC<Props> = ({onNewColor}) => {
  const [titleProps, resetTitle] = useInput('');
  const [colorProps, resetColor] = useInput('#000000');

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();
    onNewColor(titleProps.value, colorProps.value);
    resetTitle();
    resetColor();
  };

  return (
    <form onSubmit={submit}>
      <input type="text" {...titleProps} placeholder="color title...." />
      <input type="color" {...colorProps} required />
      <button>Add</button>
    </form>
  );
};

export const AddColorFormContextVersion = () => {
  const {newColor} = useColors();
  const [titleProps, resetTitle] = useInput('');
  const [colorProps, resetColor] = useInput('#000000');

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();
    newColor(titleProps.value, colorProps.value);
    resetTitle();
    resetColor();
  };

  return (
    <form onSubmit={submit}>
      <input type="text" {...titleProps} placeholder="color title...." />
      <input type="color" {...colorProps} required />
      <button>Add</button>
    </form>
  );
};

export default AddColorFormCustomHookVersion;
