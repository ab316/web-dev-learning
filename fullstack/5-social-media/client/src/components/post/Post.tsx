import {FC, useEffect, useState} from 'react';
import {MoreVert} from '@material-ui/icons';
import dayjs from 'dayjs';
import {IPost, IUser} from '../../interfaces';
import './post.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

interface IProps {
  post: IPost;
}

const Post: FC<IProps> = ({post}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [like, setLike] = useState<number>(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<IUser>({
    _id: 0,
    profilePicture: `${PF}defaultProfile.svg`,
    username: '',
    followers: [],
    followings: [],
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?userId=${post.userId}`);
      console.log(`user ${post.userId} fetched`, res.data);
      const user: IUser = res.data;
      if (!user.profilePicture || user.profilePicture.trim().length === 0) {
        user.profilePicture = `${PF}defaultProfile.svg`;
      }
      setUser(res.data);
    };
    fetchUser();
  }, [post, PF]);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img src={user.profilePicture} alt="Person 1" className="postProfileImg" />
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
          {post.img && <img src={`${PF}${post.img}`} alt="Mountains" className="postImg" />}
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
