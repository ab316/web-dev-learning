import './sidebar.css';
import {RssFeed, Chat, HelpOutline, WorkOutline, Event, School, Group, PlayCircleFilled} from '@material-ui/icons';

const sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>

          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chat</span>
          </li>

          <li className="sidebarListItem">
            <PlayCircleFilled className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>

          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>

          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>

          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>

          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Event</span>
          </li>

          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>

        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
          <li className="sidebarFriendListItem">
            <img className="sidebarFriendImage" src="/assets/person/2.png" alt="friend" />
            <span className="sidebarFriendName">John Doe</span>
          </li>

          <li className="sidebarFriendListItem">
            <img className="sidebarFriendImage" src="/assets/person/2.png" alt="friend" />
            <span className="sidebarFriendName">John Doe</span>
          </li>

          <li className="sidebarFriendListItem">
            <img className="sidebarFriendImage" src="/assets/person/2.png" alt="friend" />
            <span className="sidebarFriendName">John Doe</span>
          </li>

          <li className="sidebarFriendListItem">
            <img className="sidebarFriendImage" src="/assets/person/2.png" alt="friend" />
            <span className="sidebarFriendName">John Doe</span>
          </li>

          <li className="sidebarFriendListItem">
            <img className="sidebarFriendImage" src="/assets/person/2.png" alt="friend" />
            <span className="sidebarFriendName">John Doe</span>
          </li>

          <li className="sidebarFriendListItem">
            <img className="sidebarFriendImage" src="/assets/person/2.png" alt="friend" />
            <span className="sidebarFriendName">John Doe</span>
          </li>

          <li className="sidebarFriendListItem">
            <img className="sidebarFriendImage" src="/assets/person/2.png" alt="friend" />
            <span className="sidebarFriendName">John Doe</span>
          </li>

          <li className="sidebarFriendListItem">
            <img className="sidebarFriendImage" src="/assets/person/2.png" alt="friend" />
            <span className="sidebarFriendName">John Doe</span>
          </li>

          <li className="sidebarFriendListItem">
            <img className="sidebarFriendImage" src="/assets/person/2.png" alt="friend" />
            <span className="sidebarFriendName">John Doe</span>
          </li>

          <li className="sidebarFriendListItem">
            <img className="sidebarFriendImage" src="/assets/person/2.png" alt="friend" />
            <span className="sidebarFriendName">John Doe</span>
          </li>

          <li className="sidebarFriendListItem">
            <img className="sidebarFriendImage" src="/assets/person/2.png" alt="friend" />
            <span className="sidebarFriendName">John Doe</span>
          </li>

          <li className="sidebarFriendListItem">
            <img className="sidebarFriendImage" src="/assets/person/2.png" alt="friend" />
            <span className="sidebarFriendName">John Doe</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default sidebar;
