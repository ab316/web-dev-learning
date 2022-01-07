import React, {FC} from 'react';
import faker from 'faker';
import {FixedSizeList} from 'react-window';

const bigList = [...Array(5000)].map(() => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar(),
}));

const List: FC<{data: any[]; renderItem: (item: any) => JSX.Element; renderEmpty: () => JSX.Element}> = ({
  data,
  renderItem,
  renderEmpty,
}) => {
  return !data.length ? (
    renderEmpty()
  ) : (
    <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
      {data.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

const NonVirtualizedList = () => {
  const renderItem = (item: any) => {
    return (
      <div
        style={{
          height: 50,
          display: 'flex',
          backgroundColor: '#333',
          padding: 10,
          margin: '10px 0px 10px 0px',
          borderRadius: 10,
          color: 'white',
          width: '50%',
        }}>
        <img
          style={{marginRight: 10}}
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
          alt="Avatar"
        />
        <p>
          {item.name} - {item.email}
        </p>
      </div>
    );
  };
  return (
    <div style={{overflow: 'scroll', height: '300px'}}>
      <List data={bigList} renderItem={renderItem} renderEmpty={() => <>Empty list</>} />
    </div>
  );
};

const VirtualizedList = () => {
  const renderRow = ({index, style}: {index: number; style: any}) => (
    <div
      style={{
        ...style,
        display: 'flex',
        backgroundColor: '#333',
        borderRadius: 10,
        top: `${parseFloat(style.top)}px`,
        color: 'white',
        width: '50%',
      }}>
      <img
        style={{marginRight: 10}}
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
        alt="Avatar"
      />
      <p>
        {bigList[index].name} - {bigList[index].email}
      </p>
    </div>
  );

  return (
    <FixedSizeList height={window.innerHeight / 2} width="80%" itemCount={bigList.length} itemSize={50}>
      {renderRow}
    </FixedSizeList>
  );
};

export default VirtualizedList;
