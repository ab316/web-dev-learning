import styled from 'styled-components';
import {banners} from 'data/news';
import BannerList from './BannerList';

const StyledAside = styled.aside`
  flex: 3;
`;

const EmployeeAside = () => {
  return (
    <StyledAside>
      <BannerList items={banners} />
    </StyledAside>
  );
};

export default EmployeeAside;
