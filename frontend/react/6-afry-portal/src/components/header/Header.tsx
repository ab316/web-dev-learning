import styled from 'styled-components';

import Topbar from './topbar/Topbar';

const StyledHeader = styled.div`
  height: 8rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Topbar />
    </StyledHeader>
  );
};

export default Header;
