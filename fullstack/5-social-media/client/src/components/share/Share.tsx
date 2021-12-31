import {useRef, useState} from 'react';
import axios from 'axios';
import {PermMedia, Label, Room, EmojiEmotions, Cancel} from '@material-ui/icons';
import useAuth from 'context/auth/AuthContext';
import {INewPost} from 'interfaces/post';
import './share.css';

const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user} = useAuth();
  const desc = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit: React.FormEventHandler = async (e) => {
    if (!desc.current || !user) {
      return;
    }
    e.preventDefault();

    const newPost: INewPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      newPost.img = fileName;

      try {
        await axios.post('/upload', data);
      } catch (err) {
        console.log('File upload error', err);
      }
    }

    try {
      await axios.post('/posts', newPost);
      desc.current.value = '';
      window.location.reload();
    } catch (err) {
      console.error('Create post error', err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={`${PF}${user?.profilePicture || 'defaultProfile.svg'}`} alt="Profile" className="shareProfileImg" />
          <input
            type="text"
            className="shareInput"
            ref={desc}
            placeholder={`What is on your mind, ${user?.username}?`}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImageContainer">
            <img src={URL.createObjectURL(file)} className="shareImage" alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia className="shareOptionIcon" htmlColor="tomato" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
                style={{display: 'none'}}
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              />
            </label>

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

          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
