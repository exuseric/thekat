import React, { useContext, useState, useEffect } from 'react';

import styles from '../styles/task.module.css';
import { Link } from 'react-router-dom';
import { ListContext } from '../store';
import { FiCheck, FiCircle } from 'react-icons/fi';

const Task = ({ selfId, title, completed }) => {
  const { activeList, GET_ITEM, CURRENTLY_ACTIVE, COMPLETE_ITEM } = useContext(
    ListContext
  );
  const [list, setList] = useState('');

  useEffect(() => {
    const data = GET_ITEM('list', activeList);
    if (data !== undefined) setList(data);
  }, [GET_ITEM, activeList]);

  const handleTaskChange = () => CURRENTLY_ACTIVE('task', selfId);

  const handleComplete = (e) => {
    const {
      checked,
      dataset: { id },
    } = e.target;

    COMPLETE_ITEM('task', id, checked);
  };

  return (
    <div
      className={`${styles.container} ${styles.task_container}`}
      id={`${completed ? styles.completed : null}`}
    >
      <label
        htmlFor={`task-${selfId}`}
        className={styles.completed}
        tabIndex='1'
      >
        <span className='icon'>{completed ? <FiCheck /> : <FiCircle />}</span>
        <input
          type='checkbox'
          id={`task-${selfId}`}
          className={styles.check}
          onChange={handleComplete}
          data-id={selfId}
        />
      </label>
      {completed ? (
        <Link to='#' className={styles.link}>
          {title}
        </Link>
      ) : (
        <Link
          to={`/list/${list.title}/${title}/`}
          className={styles.link}
          onClick={handleTaskChange}
        >
          {title}
        </Link>
      )}
    </div>
  );
};

export default Task;
