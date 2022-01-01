import {FC, useState} from 'react';
import {v4} from 'uuid';
import colorData from 'data/colors.json';
import {IColor} from 'interfaces/colors';
import ColorListNormalVersion, {ColorListContextVersion} from 'components/colors/ColorList';
import AddColorFormCustomHookVersion, {AddColorFormContextVersion} from 'components/colors/AddColorForm';
import ColorProvider from 'components/colors/ColorProvider';

// Normal version
export const ColorsNormalVersion: FC = () => {
  const [colors, setColors] = useState<IColor[]>(colorData);

  const onRemoveColor = (id: string) => {
    setColors(colors.filter((c) => c.id != id));
  };

  const onRate = (id: string, rating: number) => {
    const newColors = colors.map((color) => (color.id === id ? {...color, rating} : color));
    setColors(newColors);
  };

  const onNewColor = (title: string, color: string) => {
    const newColor: IColor = {
      id: v4(),
      rating: 0,
      title,
      color,
    };
    setColors([...colors, newColor]);
  };

  return (
    <article style={{border: '1px solid #000', padding: '20px', marginBottom: '20px'}}>
      <h1>Color Organizer</h1>
      <AddColorFormCustomHookVersion onNewColor={onNewColor} />
      <ColorListNormalVersion colors={colors} onRemoveColor={onRemoveColor} onRate={onRate} />
    </article>
  );
};

export const ColorsContextVersion: FC = () => {
  // const [colors, setColors] = useState<IColor[]>(colorData);

  // const onRemoveColor = (id: string) => {
  //   setColors(colors.filter((c) => c.id != id));
  // };

  // const onRate = (id: string, rating: number) => {
  //   const newColors = colors.map((color) => (color.id === id ? {...color, rating} : color));
  //   setColors(newColors);
  // };

  // const onNewColor = (title: string, color: string) => {
  //   const newColor: IColor = {
  //     id: v4(),
  //     rating: 0,
  //     title,
  //     color,
  //   };
  //   setColors([...colors, newColor]);
  // };

  return (
    <ColorProvider>
      <article style={{border: '1px solid #000', padding: '20px', marginBottom: '20px'}}>
        <h1>Color Organizer</h1>
        <AddColorFormContextVersion />
        <ColorListContextVersion />
      </article>
    </ColorProvider>
  );
};

export default ColorsContextVersion;
