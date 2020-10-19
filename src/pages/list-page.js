import React, { useContext, useState, useEffect } from 'react';

import TaskLayout from '../layouts/TaskLayout';
import { Task } from '../components';
import { ListContext } from '../store';
import styles from '../styles/taskpages.module.css';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ListPage = () => {
  const { activeList, task, list, GET_ITEM, GET_TASKS } = useContext(
    ListContext
  );
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const listData = GET_ITEM('list', activeList);
    const taskData = GET_TASKS('task');

    if (listData !== undefined) setTitle(listData.title);
    if (taskData !== undefined) setTasks(taskData);
  }, [GET_ITEM, GET_TASKS, activeList, task, list]);

  const handleDropdown = () => setDropdown(!dropdown);
  const handleFocus = () => {
    if (!dropdown) setDropdown(true);
    return;
  };
  return (
    <TaskLayout page='list'>
      <div className={styles.container}>
        <header className={`header ${styles.header}`}>
          <h1 className='large-title'>{title}</h1>
        </header>
        <div className={styles.task_wrapper}>
          {tasks
            .filter((t) => !t.completed)
            .map((task) => (
              <Task
                key={task.id}
                selfId={task.id}
                title={task.title}
                completed={task.completed}
              />
            ))}
        </div>
        {tasks.filter((t) => t.completed).length > 0 ? (
          <div className={styles.completed_tasks}>
            <h2
              className={`mid-title ${styles.completed_tasks__header}`}
              tabIndex='1'
              onFocus={handleFocus}
              onClick={handleDropdown}
            >
              <div>
                <span className='icon'>
                  {dropdown ? <FiChevronUp /> : <FiChevronDown />}
                </span>
                <span>Completed</span>
              </div>
              <div>
                <p>{tasks.filter((t) => t.completed).length}</p>
              </div>
            </h2>
            <div
              className={`${styles.completed_tasks__wrapper} ${
                dropdown ? styles.dropdown_show : styles.dropdown_hide
              }`}
            >
              {tasks
                .filter((t) => t.completed)
                .map((task) => (
                  <Task
                    key={task.id}
                    selfId={task.id}
                    title={task.title}
                    completed={task.completed}
                  />
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </TaskLayout>
  );
};

export default ListPage;
