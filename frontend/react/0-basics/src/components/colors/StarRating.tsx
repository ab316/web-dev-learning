import React, {FC} from 'react';
import Star from './Star';

interface Props {
  totalStars?: number;
  selectedStars?: number;
  onRate: (rating: number) => void;
}

const createArray = (length: number) => [...Array(length)];

// StarRating can take all properties that a div tag can take
// This StarRating is a "Pure Component". It does not contain any state and will render the
// same UI given the same props
const StarRating: FC<Props> = ({totalStars = 5, selectedStars = 0, onRate = () => void 0}) => {
  return (
    <div style={{padding: '5px'}}>
      {createArray(totalStars).map((_, i) => (
        <Star key={i} selected={selectedStars > i} onSelect={() => onRate(i + 1)} />
      ))}
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </div>
  );
};

export default StarRating;
