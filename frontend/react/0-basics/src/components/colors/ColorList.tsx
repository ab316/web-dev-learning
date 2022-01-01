import {FC} from 'react';
import {IColor} from 'interfaces/colors';
import ColorNormalVersion, {ColorContextVersion} from './Color';
import {useColors} from 'components/colors/ColorProvider';

export const ColorListNormalVersion: FC<{
  colors: IColor[];
  onRemoveColor: (id: string) => void;
  onRate: (id: string, rating: number) => void;
}> = ({colors = [], onRemoveColor, onRate}) => {
  if (!colors.length) return <div>No Colors Listed</div>;
  return (
    <div>
      {colors.map((color) => (
        <ColorNormalVersion key={color.id} {...color} onRemove={onRemoveColor} onRate={onRate} />
      ))}
    </div>
  );
};

export const ColorListContextVersion = () => {
  const {colors} = useColors();
  if (!colors.length) return <div>No Colors Listed</div>;
  return (
    <div>
      {colors.map((color) => (
        <ColorContextVersion key={color.id} {...color} />
      ))}
    </div>
  );
};

export default ColorListNormalVersion;
