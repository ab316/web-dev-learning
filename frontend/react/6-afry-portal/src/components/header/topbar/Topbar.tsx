import styled from 'styled-components';
import Container from 'components/utils/Container';
import Navbar from './Navbar';
import Rightbar from './Rightbar';

const StyledTopbar = styled.div`
  /* height: 4rem; */
  background-color: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
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
    <StyledTopbar>
      <Container>
        <StyledFlex>
          <StyledLogo>
            <img src="images/AFRY-Logotype-Horizontal_White.svg" alt="AFRY" />
          </StyledLogo>
          <Navbar />
          <Rightbar />
        </StyledFlex>
      </Container>
    </StyledTopbar>
  );
};

export default Topbar;
