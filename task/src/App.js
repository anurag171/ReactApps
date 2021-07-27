import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './components/hooks/usehttp';

function App() {
  const [tasks, setTasks] = useState([]);
  

  const httpData = useHttp();

   const  {isLoading,error,sendRequest:fetchTasks} = httpData;

  useEffect(() => {
    const transformTasks = ((tasksObj) => {
      const loadedTasks = [];
  
      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey] });
      }
  
      setTasks(loadedTasks);
    });

    fetchTasks({ url: 'http://localhost:8083/v1/gettask' },transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        key={tasks.id}
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
