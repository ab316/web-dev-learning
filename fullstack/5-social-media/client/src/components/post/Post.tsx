import {FC} from 'react';
import {MoreVert} from '@material-ui/icons';
import {Users} from '../../dummyData';
import {IPost} from '../../interfaces';
import './post.css';

interface IProps {
  post: IPost;
}

const Post: FC<IProps> = ({post}) => {
  const user = Users.filter((u) => u.id === post.userId)[0];

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={user.profilePicture} alt="Person 1" className="postProfileImg" />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post.photo} alt="Mountains" className="postImg" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img src="assets/like.svg" alt="like" className="likeIcon" />
            <img src="assets/heart.svg" alt="heart" className="likeIcon" />
            <span className="postLikeCounter">{post.like} people like it</span>
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
