import styled from 'styled-components';
import {Main} from 'components/Common.styled';
import EmployeeNewsNav from 'components/employeeNewsNav/EmployeeNewsNav';
import EmployeeNewsFeed from 'components/employeeNewsFeed/EmployeeNewsFeed';

const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const StyledNewsDiv = styled.div`
  width: 100%;
  flex: 7;
  margin-right: 2rem;
`;

const Home = () => {
  return (
    <Main>
      <StyledFlex>
        <StyledNewsDiv>
          <EmployeeNewsNav />
          <EmployeeNewsFeed />
        </StyledNewsDiv>
      </StyledFlex>
    </Main>
  );
};

export default Home;
