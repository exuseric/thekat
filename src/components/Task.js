import React, { useContext, useState, useEffect } from 'react';

import styles from '../styles/task.module.css';
import { Link } from 'react-router-dom';
import { ListContext } from '../store';
import { FiCheck, FiCircle } from 'react-icons/fi';

const Task = ({ id, title, completed }) => {
  const { activeList, GET_ITEM } = useContext(ListContext);
  const [list, setList] = useState('');

  useEffect(() => {
    const data = GET_ITEM('list', activeList);
    if (data !== undefined) setList(data);
  }, [GET_ITEM, activeList]);
  return (
    <div className={styles.container}>
      <label htmlFor='completed' className={styles.completed}>
        <span className='icon'>{completed ? <FiCheck /> : <FiCircle />}</span>
        <input type='checkbox' className={styles.check} />
      </label>
      <Link to={`/list/${list.title}/${title}/`} className={styles.link}>
        {title}
      </Link>
    </div>
  );
};

export default Task;
