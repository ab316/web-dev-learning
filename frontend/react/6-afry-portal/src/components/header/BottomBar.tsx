import styled from 'styled-components';
import Container from 'components/utils/Container';

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.15);
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const StyledLink = styled.a`
  font-size: 1.3rem;
  color: #555;
  /* line-height: 70px; */
  border-right: 1px solid rgba(128, 128, 128, 0.2);
  padding: 1.5rem 1.5rem 1.5rem 0;
  text-decoration: none;
`;

const StyledList = styled.ul`
  list-style: none;
  color: #555;
  display: flex;
  flex-direction: row;
  padding: 0 1rem;
`;

const StyledListItem = styled.li`
  cursor: pointer;
  font-size: 0.95rem;
  padding: 1.5rem 1rem 1.5rem 1rem;
  &:hover {
    color: #3b4fbb;
  }
`;

const BottomBar = () => {
  const items = [
    'News',
    'Take-off Strategy',
    'Future Cities',
    'Digitalization',
    'Brand Toolbar',
    'Inclusion & Diversity',
  ];
  return (
    <StyledNav>
      <Container>
        <StyledFlex>
          <StyledLink href="/">Home</StyledLink>
          <StyledList>
            {items.map((v) => (
              <StyledListItem key={v}>{v}</StyledListItem>
            ))}
          </StyledList>
        </StyledFlex>
      </Container>
    </StyledNav>
  );
};

export default BottomBar;
