import styled from 'styled-components';
import dayjs from 'dayjs';
import {INews} from 'interfaces/news';

const StyledArticle = styled.article`
  margin-bottom: 3rem;
  display: flex;
  flex-direction: row;
  align-content: center;

  .news-image {
    width: 350px;
    display: flex;
    align-items: center;
    margin-right: 2rem;
  }

  .right-flex {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: flex-start;
    /*
    This ensures that the images are the same size
    width of parent container - horizontal space take by the image.
     */
    max-width: calc(100% - 350px - 2rem);
  }

  h2 {
    font-weight: 500;
    padding-bottom: 1rem;
    color: #333;
    font-size: 1.3rem;
  }

  h3 {
    font-weight: 400;
    color: #666;
    font-size: 1rem;
  }

  h4 {
    text-transform: uppercase;
    color: #333;
    font-weight: 300;
    font-size: 0.9rem;
    padding-bottom: 0.5rem;
  }

  .meta {
    margin-top: auto;
    color: #666;
    display: flex;
    align-content: center;

    & > span {
      padding-right: 1rem;
      line-height: 1.6rem;
    }

    button {
      border: none;
      background: none;
      padding: 0 0.5rem;
      cursor: pointer;
      color: #091769;
      opacity: 0.7;

      img {
        width: 20px;
        margin-right: 0.5rem;
      }

      span {
        font-size: 1.2rem;
      }
    }
  }
`;

const NewsCard = ({data}: {data: INews}) => {
  return (
    <a href={`/articles/${data.id}`}>
      <StyledArticle>
        <div className="news-image">
          <img src={data.image} alt="Illustration" />
        </div>
        <div className="right-flex">
          {data.category && <h4>{data.category}</h4>}
          <h2>{data.title}</h2>
          <h3>{data.subtitle}</h3>
          <div className="meta">
            <span>{dayjs(data.createdAt).format('MMMM D')}</span>
            <button>
              <img src="/images/thumbs-up.svg" alt="Thumbs Up" />
              <span>{data.likes}</span>
            </button>
          </div>
        </div>
      </StyledArticle>
    </a>
  );
};

export default NewsCard;
