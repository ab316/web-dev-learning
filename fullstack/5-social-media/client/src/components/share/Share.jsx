import {PermMedia, Label, Room, EmojiEmotions} from '@material-ui/icons';
import './share.css';

const Share = () => {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src="/assets/person/1.png" alt="person 1" className="shareProfileImg" />
          <input type="text" className="shareInput" placeholder="What is in your mind?" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia className="shareOptionIcon" htmlColor="tomato" />
              <span className="shareOptionText">Photo or Video</span>
            </div>

            <div className="shareOption">
              <Label className="shareOptionIcon" htmlColor="blue" />
              <span className="shareOptionText">Tag</span>
            </div>

            <div className="shareOption">
              <Room className="shareOptionIcon" htmlColor="green" />
              <span className="shareOptionText">Location</span>
            </div>

            <div className="shareOption">
              <EmojiEmotions className="shareOptionIcon" htmlColor="goldenrod" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>

          <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
};

export default Share;
