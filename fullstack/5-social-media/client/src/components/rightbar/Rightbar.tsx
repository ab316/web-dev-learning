import {FC} from 'react';
import {Users} from '../../dummyData';
import Online from '../online/Online';
import './rightbar.css';

interface IProps {
  profile?: boolean;
}

const rightbar: FC<IProps> = ({profile}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
        <h4 className="rightbarTitle">Online Frields</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <>
        <h4 className="rightbarTitle">My Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">Gothenburg</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Lahore</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">My Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src={`${PF}person/2.png`} alt="Following" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Some guy</span>
          </div>

          <div className="rightbarFollowing">
            <img src={`${PF}person/3.png`} alt="Following" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Robot guy</span>
          </div>

          <div className="rightbarFollowing">
            <img src={`${PF}person/4.png`} alt="Following" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Funny guy</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper"></div>
      {profile ? <ProfileRightbar /> : <HomeRightbar />}
    </div>
  );
};

export default rightbar;
