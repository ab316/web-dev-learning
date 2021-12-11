import {Task} from './Task';

export const Tasks = ({tasks, onDelete}) => {
  return (
    <>
      {tasks.map((t) => (
        <Task key={t.id} task={t} onDelete={onDelete} />
      ))}
    </>
  );
};
