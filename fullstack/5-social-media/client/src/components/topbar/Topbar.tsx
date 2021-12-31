import {Link} from 'react-router-dom';
import {Search, Person, Chat, Notifications} from '@material-ui/icons';
import './topbar.css';
import useAuth from 'context/auth/AuthContext';

const Topbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user} = useAuth();

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration: 'none'}}>
          <span className="logo">Social App</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input className="searchInput" placeholder="Search for friend, post or video" />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>

          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">3</span>
          </div>
        </div>

        <Link to={`/profile/${user?.username}`}>
          <img src={`${PF}${user?.profilePicture || 'defaultProfile.svg'}`} alt="Profile" className="topbarImage" />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
