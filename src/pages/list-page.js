import React, { useContext, useState, useEffect } from 'react';

import TaskLayout from '../layouts/TaskLayout';
import styles from '../styles/list-page.module.css';
import { ListContext } from '../store';
import { Task } from '../components';

const ListPage = () => {
  const { activeList, task, list, GET_ITEM, GET_TASKS } = useContext(
    ListContext
  );
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const listData = GET_ITEM('list', activeList);
    const taskData = GET_TASKS('task');

    if (listData !== undefined) setTitle(listData.title);
    if (taskData !== undefined) setTasks(taskData);
  }, [GET_ITEM, GET_TASKS, activeList, task, list]);
  return (
    <TaskLayout page='list'>
      <div className={styles.container}>
        <header className={`header ${styles.header}`}>
          <h1 className='large-title'>{title}</h1>
        </header>
        <div className={styles.task_wrapper}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
            />
          ))}
        </div>
      </div>
    </TaskLayout>
  );
};

export default ListPage;
