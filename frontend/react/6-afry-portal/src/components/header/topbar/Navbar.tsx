import styled from 'styled-components';

const StyledNavbar = styled.ul`
  list-style: none;
  color: #aaa;
  display: flex;
  flex-direction: row;
  margin-right: auto;
`;

const StyledListItem = styled.li`
  cursor: pointer;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 1.5rem 1rem 1.5rem 1rem;
  &:hover {
    color: #eee;
  }
`;

const Navbar = () => {
  const items = ['Time Report', 'Projects', 'Assignments', 'My Pages', 'Global Pages', 'IT Support'];
  return (
    <StyledNavbar>
      {items.map((v) => (
        <StyledListItem key={v}>{v}</StyledListItem>
      ))}
    </StyledNavbar>
  );
};

export default Navbar;
