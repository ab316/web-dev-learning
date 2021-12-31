import axios from 'axios';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import Feed from 'components/feed/Feed';
import Rightbar from 'components/rightbar/Rightbar';
import Sidebar from 'components/sidebar/Sidebar';
import Topbar from 'components/topbar/Topbar';
import {IUser} from 'interfaces/user';
import './profile.css';

// import useAuth from 'context/auth/AuthContext';

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const username = useParams().username;
  const [user, setUser] = useState<IUser>({
    _id: '',
    email: '',
    username: '',
    profilePicture: `${PF}defaultProfile.svg`,
    coverPicture: `${PF}defaultCover.jpg`,
    followings: [],
    followers: [],
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?username=${username}`);
      const user: IUser = res.data;
      if (!user.profilePicture || user.profilePicture.trim().length === 0) {
        user.profilePicture = `${PF}defaultProfile.svg`;
      }

      if (!user.coverPicture || user.coverPicture.trim().length === 0) {
        user.coverPicture = `${PF}defaultCover.jpg`;
      }
      setUser(res.data);
    };
    fetchUser();
  }, [PF, username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={user.coverPicture} alt="Cover" className="profileCoverImg" />
              <img src={user.profilePicture} alt="Profile" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.about}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
