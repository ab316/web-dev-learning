import styled from 'styled-components';
import {Container} from 'components/Common.styled';
import Navbar from './Navbar';
import Rightbar from './Rightbar';

const StyledNav = styled.nav`
  background-color: #333;
  color: #fff;
`;

const StyledFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const StyledLogo = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
`;

const Topbar = () => {
  return (
    <StyledNav>
      <Container>
        <StyledFlex>
          <StyledLogo>
            <img src="images/AFRY-Logotype-Horizontal_White.svg" alt="AFRY" />
          </StyledLogo>
          <Navbar />
          <Rightbar />
        </StyledFlex>
      </Container>
    </StyledNav>
  );
};

export default Topbar;
