import styled from 'styled-components';

const StyledNav = styled.section`
  padding-top: 2.5rem;
`;

const StyledList = styled.ul`
  list-style: none;
  color: #333;
  display: flex;
  flex-direction: row;
`;

const StyledListItem = styled.li`
  cursor: pointer;
  font-size: 0.95rem;
  padding: 0 0rem 0.5rem 0;
  margin-right: 2rem;
  font-weight: 300;
  &:hover {
    color: #3b4fbb;
  }

  &.selected {
    border-bottom: 2px solid #000;
    font-weight: 700;
  }

  &.push-right {
    margin-left: auto;
  }
`;

const NewsNav = () => {
  const items = [
    {name: 'My news feed', selected: true},
    {name: 'All news'},
    {name: 'Corona news'},
    {name: "CEO's vlog"},
  ];
  return (
    <StyledNav>
      <StyledList>
        {items.map((item) => (
          <StyledListItem className={item.selected ? 'selected' : ''} key={item.name}>
            {item.name}
          </StyledListItem>
        ))}
        <StyledListItem className="push-right">Publish</StyledListItem>
      </StyledList>
    </StyledNav>
  );
};

export default NewsNav;
