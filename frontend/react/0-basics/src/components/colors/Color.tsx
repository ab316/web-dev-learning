import {FC} from 'react';
import {IColor} from 'interfaces/colors';
import StarRating from './StarRating';
import {FaTrash} from 'react-icons/fa';
import {useColors} from './ColorProvider';

interface Props {
  onRemove: (id: string) => void;
  onRate: (id: string, rating: number) => void;
}

export const ColorNormalVersion: FC<IColor & Props> = ({id, color, rating, title, onRemove, onRate}) => {
  return (
    <section>
      <h1>{title}</h1>
      <div style={{height: 50, backgroundColor: color}}></div>
      <button onClick={() => onRemove(id)}>
        <FaTrash />
      </button>
      <StarRating selectedStars={rating} onRate={(rating) => onRate(id, rating)} />
    </section>
  );
};

export const ColorContextVersion: FC<IColor> = ({id, color, rating, title}) => {
  const {removeColor, rateColor} = useColors();

  return (
    <section>
      <h1>{title}</h1>
      <div style={{height: 50, backgroundColor: color}}></div>
      <button onClick={() => removeColor(id)}>
        <FaTrash />
      </button>
      <StarRating selectedStars={rating} onRate={(newRating) => rateColor(id, newRating)} />
    </section>
  );
};

export default ColorNormalVersion;
