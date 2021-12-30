import axios from 'axios';
import {FC, useEffect, useState} from 'react';
import {IPost} from '../../interfaces';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';

interface IProps {
  username?: string;
}

const Feed: FC<IProps> = ({username}) => {
  const [posts, setPosts] = useState<Array<IPost>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get('/posts/timeline/61ccc20ea12c6a628537eb95');
      setPosts(res.data);
    };
    fetchPosts();
  }, [username]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
