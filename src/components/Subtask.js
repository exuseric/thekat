import React, { useContext, useState } from 'react';

import { ListContext } from '../store';
import { FiCheck, FiCircle, FiTrash2 } from 'react-icons/fi';

import styles from '../styles/task.module.css';

const Subtask = ({ id, title, completed }) => {
  const { DELETE_ITEM, RENAME_ITEM } = useContext(ListContext);
  const [newTitle, setNewTitle] = useState(title);

  const handleRename = (e) => {
    const { value } = e.target;
    setNewTitle(value);
    setTimeout(RENAME_ITEM({ type: 'subtask', id, title: newTitle }), 250);
  };

  const handleDelete = (e) => DELETE_ITEM('subtask', id);

  return (
    <div className={`${styles.container} ${styles.subtask_container}`}>
      <label htmlFor='completed' className={styles.completed}>
        <span className='icon'>{completed ? <FiCheck /> : <FiCircle />}</span>
        <input type='checkbox' className={styles.check} />
      </label>
      <input
        type='text'
        className={styles.title_input}
        value={newTitle}
        onChange={handleRename}
      />
      <button
        type='button'
        className={styles.delete_btn}
        onClick={handleDelete}
      >
        <span className='icon'>
          <FiTrash2 />
        </span>
      </button>
    </div>
  );
};

export default Subtask;
