import {FC} from 'react';
import {IUser} from '../../interfaces';
import './online.css';

interface IProps {
  user: IUser;
}

const Online: FC<IProps> = ({user}) => {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img src={user.profilePicture} alt="person" className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
};

export default Online;
