import {MoreVert, Favorite} from '@material-ui/icons';
import './post.css';

const Post = () => {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src="assets/person/1.png" alt="Person 1" className="postProfileImg" />
            <span className="postUsername">Wacky Racer</span>
            <span className="postDate">5 minutes ago</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">Hey it's my first post here on Social App :)</span>
          <img src="assets/post/1.jfif" alt="Mountains" className="postImg" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img src="assets/like.svg" alt="like" className="likeIcon" />
            <img src="assets/heart.svg" alt="heart" className="likeIcon" />
            <span className="postLikeCounter">32 people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">9 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
