import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  align-items: center;

  // The immediate child div and ul should have flex: 1
  & > div,
  & > ul {
    flex: 1;
  }

  @media (max-width: ${({theme}) => theme.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;
