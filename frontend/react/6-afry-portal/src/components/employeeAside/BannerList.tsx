import {IBanner} from 'interfaces/news';
import styled from 'styled-components';

const StyledDiv = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const StyledArticle = styled.article`
  margin-bottom: 1rem;
`;

const Banner = ({image, url}: {image: string; url: string}) => (
  <StyledArticle>
    <a href={url}>
      <img src={image} alt={image}></img>
    </a>
  </StyledArticle>
);

const BannerList = ({items}: {items: IBanner[]}) => {
  return (
    <StyledDiv>
      {items.map((banner) => (
        <Banner {...banner} />
      ))}
    </StyledDiv>
  );
};

export default BannerList;
