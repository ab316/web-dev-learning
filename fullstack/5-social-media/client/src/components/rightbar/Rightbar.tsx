import './rightbar.css';
import {Users} from '../../dummyData';
import Online from '../online/Online';

const rightbar = () => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img src="assets/birthday.png" alt="Birthday" className="birthdayImg" />
          <span className="birthdayText">
            <b>Tom</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>

        <img src="assets/ad.jpg" alt="Ad" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Frields</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default rightbar;
