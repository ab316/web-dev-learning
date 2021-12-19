import styled from 'styled-components';

export const Button = styled.button`
  padding: 15px 60px;
  border: none;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  background-color: ${(props: {bg?: string}) => props.bg || '#fff'};
  color: ${(props: {color?: string}) => props.color || '#333'};

  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`;
