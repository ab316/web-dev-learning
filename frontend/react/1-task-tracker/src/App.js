import {useState, useEffect} from 'react';
import Header from './components/Header';
import {Tasks} from './components/Tasks';
import {AddTask} from './components/AddTask';

const serverUrl = 'http://localhost:5000';

function App() {
  // State is immutable. You have to set it again (using the set method) when needed and it gets propagated down to the components
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch(`${serverUrl}/tasks`);
    const data = await res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`${serverUrl}/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    // We can not provide an async function to useEffect, so we make a async function inside it and call it instead
    (async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    })();
    // [] is required to run the effect only once when the component loads
  }, []);

  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = {id, ...task};
    const res = await fetch(`${serverUrl}/tasks`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  };

  const deleteTask = async (id) => {
    await fetch(`${serverUrl}/tasks/${id}`, {method: 'DELETE'});
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleReminder = async (id) => {
    const task = await fetchTask(id);
    const updatedTask = {...task, reminder: !task.reminder};
    const res = await fetch(`${serverUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedTask),
    });
    const newTask = await res.json();
    setTasks(tasks.map((task) => (task.id === id ? newTask : task)));
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
