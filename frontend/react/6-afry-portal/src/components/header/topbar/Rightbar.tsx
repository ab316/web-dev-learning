import styled from 'styled-components';

const StyledNavbar = styled.ul`
  list-style: none;
  color: #eee;
  display: flex;
  flex-direction: row;
`;

const StyledListItem = styled.li`
  cursor: pointer;
  padding: 1rem 1rem 1rem 1rem;
`;

const Rightbar = () => {
  return (
    <StyledNavbar>
      <StyledListItem>
        <i className="fas fa-search fa-2x"></i>
      </StyledListItem>

      <StyledListItem>
        <i className="fas fa-border-none fa-2x"></i>
      </StyledListItem>

      <StyledListItem>
        <i className="far fa-bell fa-2x"></i>
      </StyledListItem>

      <StyledListItem>
        <i className="fas fa-user fa-2x"></i>
      </StyledListItem>
    </StyledNavbar>
  );
};

export default Rightbar;
