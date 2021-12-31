import {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Add, Remove} from '@material-ui/icons';
import {IFriend, IUser} from 'interfaces/user';
import useAuth from 'context/auth/AuthContext';
import Online from '../online/Online';
import './rightbar.css';
import {ACTION_TYPE} from 'context/auth/authActions';

interface IProps {
  user?: IUser;
}

const RightBar: FC<IProps> = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState<Array<IFriend>>([]);
  const {user: currentUser, dispatch} = useAuth();
  const [followed, setFollowed] = useState(currentUser?.followings?.includes(user?._id ?? '') === true);

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

  // useEffect(() => {
  //   console.log('current user updated', currentUser);
  // }, [currentUser]);

  // useEffect(() => {
  //   console.log('profile user updated', user);
  // }, [user]);

  // useEffect(() => {
  //   console.log('followed updated', followed);
  // }, [followed]);

  // useEffect(() => {
  //   console.log('both current and profile updated');
  // }, [currentUser, user]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user?._id}/unfollow`, {userId: currentUser?._id});
        dispatch({type: ACTION_TYPE.UNFOLLOW, payload: user?._id});
      } else {
        await axios.put(`/users/${user?._id}/follow`, {userId: currentUser?._id});
        dispatch({type: ACTION_TYPE.FOLLOW, payload: user?._id});
      }
      setFollowed(!followed);
    } catch (err) {
      console.error('Follow error', err);
    }
  };

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
        {user?.username !== currentUser?.username && (
          <button className="rightbarFollowButton" onClick={handleFollow}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
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
            <Link key={f._id} to={`/profile/${f.username}`} style={{textDecoration: 'none'}}>
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
