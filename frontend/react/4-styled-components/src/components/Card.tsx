import {ContentItem} from '../interfaces';
import {StyledCard} from './styles/Card.styled';

export const Card = ({item}: {item: ContentItem}) => {
  return (
    // In every other card, the flex row direction is reversed and the image moves to the left
    <StyledCard layout={item.id % 2 === 0 ? 'row-reverse' : undefined}>
      <div>
        <h2>{item.title}</h2>
        <p>{item.body}</p>
      </div>

      <div>
        <img src={`./images/${item.image}`} alt="" />
      </div>
    </StyledCard>
  );
};
