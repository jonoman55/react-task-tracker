import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import TaskDetails from './components/TaskDetails';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // Fetch Task
  const fetchTask = async (id) => {
    const { data } = await axios.get(
      `http://localhost:5000/tasks/${id}`
    );
    return data;
  };

  // Fetch Tasks
  const fetchTasks = async () => {
    const { data } = await axios.get(
      'http://localhost:5000/tasks'
    );
    return data;
  };

  // Add Task
  const addTask = async (task) => {
    const { data } = await axios.post(
      `http://localhost:5000/tasks`, task
    );
    setTasks([...tasks, data]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder 
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const upTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const { data } = await axios.put(
      `http://localhost:5000/tasks/${id}`, upTask
    );
    setTasks(tasks.map((task) =>
      task.id === id
        ? { ...task, reminder: data.reminder } : task
    ));
  };

  return (
    <Router>
      <div className='container'>
        <Header
          title='Task Tracker'
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  <p>No Tasks To Show</p>
                )}
              </>
            }
          />
          <Route path='/task/:id' element={<TaskDetails />} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;