import {FC} from 'react';
import {IUser} from '../../interfaces';
import './friend.css';

interface IProps {
  user: IUser;
}

const Friend: FC<IProps> = ({user}) => {
  return (
    <li className="sidebarFriendListItem">
      <img className="sidebarFriendImage" src={user.profilePicture} alt="friend" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default Friend;
