import {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import {MoreVert} from '@material-ui/icons';
import {IPost} from 'interfaces/post';
import {IUser} from 'interfaces/user';
import useAuth from 'context/auth/AuthContext';
import './post.css';

interface IProps {
  post: IPost;
}

const Post: FC<IProps> = ({post}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [like, setLike] = useState<number>(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<IUser>({
    _id: '0',
    username: '',
    email: '',
    followers: [],
    followings: [],
  });

  const {user: loggedUser} = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?userId=${post.userId}`);
      console.log(`user ${post.userId} fetched`, res.data);
      setUser(res.data);
    };

    fetchUser();
  }, [post, PF, loggedUser]);

  useEffect(() => {
    if (loggedUser) setIsLiked(post.likes.includes(loggedUser?._id));
  }, [post, loggedUser]);

  const likeHandler = () => {
    try {
      const loggedUserId = loggedUser?._id as string;
      if (isLiked) {
        console.log('unliking');
        axios.put(`/posts/${post._id}/unlike`, {userId: loggedUserId});
        post.likes = post.likes.splice(post.likes.indexOf(loggedUserId), 1);
        setIsLiked(false);
        setLike(like - 1);
      } else {
        console.log('liking');
        axios.put(`/posts/${post._id}/like`, {userId: loggedUserId});
        post.likes.push(loggedUserId);
        setIsLiked(true);
        setLike(like + 1);
      }
    } catch (err) {
      console.error('Like error', err);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img src={`${PF}${user?.profilePicture || 'defaultProfile.svg'}`} alt="User" className="postProfileImg" />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{dayjs(post.createdAt).fromNow()}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {post.img && <img src={`${PF}${post.img}`} alt="Post" className="postImg" />}
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img src={`${PF}like.svg`} alt="like" className="likeIcon" onClick={likeHandler} />
            <img src={`${PF}heart.svg`} alt="heart" className="likeIcon" onClick={likeHandler} />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
