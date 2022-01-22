import MultiNewsCard from 'components/newsCard/MultiNewsCard';
import NewsCard from 'components/newsCard/NewsCard';
import {employeeNews, globalNews} from 'data/news';
import styled from 'styled-components';

const StyledSection = styled.section`
  .global-news,
  .news-feed article {
    margin-bottom: 2rem;
  }
`;

const EmployeeNewsFeed = () => {
  return (
    <StyledSection>
      <div className="global-news">
        <MultiNewsCard news={globalNews} />
      </div>
      <div className="news-feed">
        {employeeNews.map((item) => (
          <NewsCard data={item} />
        ))}
      </div>
    </StyledSection>
  );
};

export default EmployeeNewsFeed;
