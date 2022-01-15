import styled from 'styled-components';
import {Main} from 'components/Common.styled';
import EmployeeNewsNav from 'components/employeeNewsNav/EmployeeNewsNav';
import EmployeeNewsFeed from 'components/employeeNewsFeed/EmployeeNewsFeed';

const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Home = () => {
  return (
    <Main>
      <StyledFlex>
        <div style={{width: '100%'}}>
          <EmployeeNewsNav />
          <EmployeeNewsFeed />
        </div>
      </StyledFlex>
    </Main>
  );
};

export default Home;
