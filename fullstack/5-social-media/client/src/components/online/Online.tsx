import {FC} from 'react';
import {IUser} from 'interfaces/user';
import './online.css';

interface IProps {
  user: IUser;
}

const Online: FC<IProps> = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img src={`${PF}${user.profilePicture}`} alt="person" className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
};

export default Online;
