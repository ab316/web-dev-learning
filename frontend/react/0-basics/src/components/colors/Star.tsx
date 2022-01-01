import {FC} from 'react';
import {FaStar} from 'react-icons/fa';

const Star: FC<{
  selected?: boolean;
  onSelect?: () => void;
}> = ({selected = false, onSelect = () => void 0}) => {
  return <FaStar color={selected ? 'red' : 'grey'} onClick={onSelect} />;
};

export default Star;
