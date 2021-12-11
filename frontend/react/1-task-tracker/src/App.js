import {useState} from 'react';
import Header from './components/Header';
import {Tasks} from './components/Tasks';
import {AddTask} from './components/AddTask';

function App() {
  // State is immutable. You have to set it again (using the set method) when needed and it gets propagated down to the components
  const [showAddTask, setShowAddTask] = useState(false);
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

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = {id, ...task};
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, reminder: !task.reminder} : task,
      ),
    );
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No tasks to show'
      )}
    </div>
  );
}

export default App;
