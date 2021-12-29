import axios from 'axios';
import {useEffect, useState} from 'react';
import {IPost} from '../../interfaces';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';

const Feed = () => {
  const [posts, setPosts] = useState<Array<IPost>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('posts/timeline/61ccc20ea12c6a628537eb95');
      console.log(`Timeline posts for user 61ccc20ea12c6a628537eb95 fetched`, res.data);
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

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
