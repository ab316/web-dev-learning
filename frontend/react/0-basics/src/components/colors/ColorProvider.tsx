import React, {FC, useState, createContext} from 'react';
import {v4} from 'uuid';
import {IColor} from 'interfaces/colors';
import colorData from 'data/colors.json';
import {useContext} from 'react';

type NewColorFunction = (title: string, color: string) => void;
type RemoveColorFunction = (id: string) => void;
type RateColorFunction = (id: string, rating: number) => void;

interface IColorContext {
  colors: IColor[];
  newColor: NewColorFunction;
  removeColor: RemoveColorFunction;
  rateColor: RateColorFunction;
}

const stub = () => {
  throw new Error('You forgot to wrap the component around the context');
};

const defaultValue: IColorContext = {
  colors: [],
  newColor: stub,
  removeColor: stub,
  rateColor: stub,
};

export const ColorContext = createContext<IColorContext>(defaultValue);

const ColorProvider: FC = ({children}) => {
  const [colors, setColors] = useState(colorData);

  const newColor: NewColorFunction = (title, color) => {
    const newColor: IColor = {
      id: v4(),
      rating: 0,
      title,
      color,
    };
    setColors([...colors, newColor]);
  };

  const removeColor: RemoveColorFunction = (id) => {
    setColors(colors.filter((c) => c.id != id));
  };

  const rateColor: RateColorFunction = (id, rating) => {
    const newColors = colors.map((color) => (color.id === id ? {...color, rating} : color));
    setColors(newColors);
  };

  const value: IColorContext = {
    colors,
    newColor,
    removeColor,
    rateColor,
  };

  return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>;
};

export const useColors = () => useContext(ColorContext);
export default ColorProvider;
