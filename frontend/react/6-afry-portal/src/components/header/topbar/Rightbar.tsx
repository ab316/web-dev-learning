import styled from 'styled-components';

const StyledNavbar = styled.ul`
  list-style: none;
  color: #eee;
  display: flex;
  flex-direction: row;

  li {
    cursor: pointer;
    padding: 1rem 1rem 1rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Rightbar = () => {
  return (
    <StyledNavbar>
      <li>
        <img src="/images/search.svg" alt="Search" />
      </li>

      <li>
        <img src="/images/launcher.svg" alt="Launcher" />
      </li>

      <li>
        <img src="/images/bell.svg" alt="Bell" />
      </li>

      <li>
        <i className="fas fa-user fa-2x"></i>
      </li>
    </StyledNavbar>
  );
};

export default Rightbar;
