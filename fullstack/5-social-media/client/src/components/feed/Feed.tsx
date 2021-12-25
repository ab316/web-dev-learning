import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';

const feed = () => {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default feed;
