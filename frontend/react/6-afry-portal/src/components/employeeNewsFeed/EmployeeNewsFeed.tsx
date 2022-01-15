import NewsCard from 'components/newsCard/NewsCard';
import {employeeNews} from 'data/news';
import styled from 'styled-components';

const StyledSection = styled.section`
  padding-top: 2rem;
`;

const EmployeeNewsFeed = () => {
  const items = employeeNews;

  return (
    <StyledSection>
      {items.map((item) => (
        <NewsCard data={item} />
      ))}
    </StyledSection>
  );
};

export default EmployeeNewsFeed;
