import {FC, useEffect, useState} from 'react';
import {IFriend, IUser} from 'interfaces/user';
import Online from '../online/Online';
import './rightbar.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

interface IProps {
  user?: IUser;
}

const RightBar: FC<IProps> = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState<Array<IFriend>>([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`/users/friends/${user?._id}`);
        setFriends(friendList.data);
      } catch (err) {
        console.error('Fetch friends error', err);
      }
    };

    if (user) getFriends();
  }, [user]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}birthday.png`} alt="Birthday" className="birthdayImg" />
          <span className="birthdayText">
            <b>Tom</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>

        <img src={`${PF}ad.jpg`} alt="Ad" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {/* {user.followers.map((u) => (
            <Online key={u._id} user={u} />
          ))} */}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const relationshipStatuses = ['Single', 'Married', '-'];
    const relationshipStatus = user?.relationshipStatus ? relationshipStatuses[user?.relationshipStatus - 1] : '-';
    return (
      <>
        <h4 className="rightbarTitle">My Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user?.city}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user?.from}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{relationshipStatus}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((f) => (
            <Link to={`/profile/${f.username}`} style={{textDecoration: 'none'}}>
              <div key={f._id} className="rightbarFollowing">
                <img src={`${PF}${f.profilePicture}`} alt="Following" className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{f.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper"></div>
      {user ? <ProfileRightbar /> : <HomeRightbar />}
    </div>
  );
};

export default RightBar;
