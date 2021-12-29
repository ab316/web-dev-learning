import {Search, Person, Chat, Notifications} from '@material-ui/icons';
import './topbar.css';

const index = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Social App</span>
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

        <img src={`${PF}person/1.png`} alt="Profile" className="topbarImage" />
      </div>
    </div>
  );
};

export default index;
