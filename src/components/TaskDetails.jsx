import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from './Button';

function TaskDetails() {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/tasks/${params.id}`
      );
      setTask(data);
      setLoading(false);
    }
    fetchTask();
  }, [params.id]);

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      <h3>{task.text}</h3>   
        <p>{task.day}</p>
        <Button text='Go Back' onClick={() => navigate(-1)}/>
    </div>
  );
};

export default TaskDetails;