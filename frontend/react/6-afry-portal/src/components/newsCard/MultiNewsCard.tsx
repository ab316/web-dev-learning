import styled from 'styled-components';
import {INews} from 'interfaces/news';
import NewsCard from './NewsCard';

const StyledDiv = styled.div`
  background-color: #efefef;
  padding: 2rem 0;
`;

const MultiNewsCard = ({news}: {news: INews[]}) => {
  return (
    <StyledDiv>
      <NewsCard data={news[0]} />
    </StyledDiv>
  );
};

export default MultiNewsCard;
