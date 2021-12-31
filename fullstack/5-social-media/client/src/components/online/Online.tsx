import {FC} from 'react';
import {IFriend} from 'interfaces/user';
import './online.css';

interface IProps {
  friend: IFriend;
}

const Online: FC<IProps> = ({friend}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img src={`${PF}${friend.profilePicture}`} alt="Friend" className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{friend.username}</span>
    </li>
  );
};

export default Online;
