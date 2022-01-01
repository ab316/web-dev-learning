import React, {CSSProperties, FC, useState} from 'react';
import Star from './Star';

interface Props {
  totalStars?: number;
  style?: CSSProperties;
}

const createArray = (length: number) => [...Array(length)];

// StarRating can take all properties that a div tag can take
const StarRating: FC<React.ComponentPropsWithRef<'div'> & Props> = ({totalStars = 5, style = {}, ...props}) => {
  // invoking setSelectedStars will re-render the component
  const [selectedStars, setSelectedStars] = useState(0);
  return (
    <div style={{padding: '5px', ...style}} {...props}>
      {createArray(totalStars).map((_, i) => (
        // Calling setSelectedStars when a star is click causes the component to re-render
        // and we update the number of selected stars
        <Star key={i} selected={selectedStars > i} onSelect={() => setSelectedStars(i + 1)} />
      ))}
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </div>
  );
};

export default StarRating;
