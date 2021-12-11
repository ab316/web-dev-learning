import {useState} from 'react';
import Header from './components/Header';
import {Tasks} from './components/Tasks';

function App() {
  // State is immutable. You have to set it again (using the set method) when needed and it gets propagated down to the components
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctor',
      day: '13th Dec at 12:00',
      reminder: true,
    },
    {
      id: 2,
      text: 'Groceries',
      day: '13th Dec at 18:00',
      reminder: false,
    },
    {
      id: 3,
      text: 'Daily',
      day: '13th Dec at 09:00',
      reminder: true,
    },
  ]);

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <Header />
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} />
      ) : (
        'No tasks to show'
      )}
    </div>
  );
}

export default App;
