import axios from 'axios';
import {FC, useEffect, useState} from 'react';
import {IPost} from 'interfaces/post';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import useAuth from 'context/auth/AuthContext';

interface IProps {
  username?: string;
}

const Feed: FC<IProps> = ({username}) => {
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const {user} = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user?._id}`);
      setPosts(res.data);
    };
    fetchPosts();
  }, [username, user]);

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
