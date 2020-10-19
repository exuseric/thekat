import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import TaskLayout from '../layouts/TaskLayout';
import { ListContext } from '../store';
import { Subtask } from '../components';

import styles from '../styles/taskpages.module.css';
import { FiArrowLeft } from 'react-icons/fi';

const ListPage = () => {
  const { activeTask, activeList, subtask, GET_ITEM, GET_TASKS } = useContext(
    ListContext
  );
  const [title, setTitle] = useState('');
  const [listTitle, setListTitle] = useState('');
  const [subtasks, setSubtasks] = useState([]);

  let history = useHistory();

  useEffect(() => {
    const listData = GET_ITEM('list', activeList);
    const taskData = GET_ITEM('task', activeTask);
    const subtaskData = GET_TASKS('subtask');

    if (taskData !== undefined) setTitle(taskData.title);
    if (subtaskData !== undefined) setSubtasks(subtaskData);
    if (listData !== undefined) setListTitle(listData.title);
  }, [GET_ITEM, GET_TASKS, activeList, activeTask, subtask]);

  const handleGoBack = () => history.goBack();

  return (
    <TaskLayout page='task'>
      <div className={styles.container}>
        <header className={`header ${styles.header} ${styles.task_header}`}>
          <h2
            className={`mid-title ${styles.task_goBack}`}
            onClick={handleGoBack}
          >
            <span className='icon'>
              <FiArrowLeft />
            </span>
            <span>{listTitle}</span>
          </h2>
          <h2 className='large-title'>{title}</h2>
        </header>
        <div className={styles.task_wrapper}>
          {subtasks.map((subtask) => (
            <Subtask
              key={subtask.id}
              selfId={subtask.id}
              title={subtask.title}
              completed={subtask.completed}
            />
          ))}
        </div>
      </div>
    </TaskLayout>
  );
};

export default ListPage;
