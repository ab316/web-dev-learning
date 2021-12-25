import './rightbar.css';

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
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img src="assets/person/3.png" alt="person" className="rightbarProfileImg" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Ragnar Lodbrok</span>
          </li>

          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img src="assets/person/3.png" alt="person" className="rightbarProfileImg" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Squids Henderson</span>
          </li>

          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img src="assets/person/3.png" alt="person" className="rightbarProfileImg" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Chewy Sugar-Gold</span>
          </li>

          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img src="assets/person/3.png" alt="person" className="rightbarProfileImg" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Bad News Cocktoasten</span>
          </li>

          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img src="assets/person/3.png" alt="person" className="rightbarProfileImg" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Rock Candy Endicott</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default rightbar;
