import React, { useContext, useState } from 'react';

import { ListContext } from '../store';
import { FiCheck, FiCircle, FiTrash2 } from 'react-icons/fi';

import styles from '../styles/task.module.css';

const Subtask = ({ selfId, title, completed }) => {
  const { DELETE_ITEM, RENAME_ITEM, COMPLETE_ITEM } = useContext(ListContext);
  const [newTitle, setNewTitle] = useState(title);

  const handleRename = (e) => {
    const { value } = e.target;
    setNewTitle(value);
    setTimeout(RENAME_ITEM({ type: 'subtask', selfId, title: newTitle }), 250);
  };

  const handleDelete = (e) => DELETE_ITEM('subtask', selfId);

  const handleComplete = (e) => {
    const {
      checked,
      dataset: { id },
    } = e.target;

    COMPLETE_ITEM('subtask', id, checked);
  };

  return (
    <div
      className={`${styles.container} ${styles.subtask_container}`}
      id={`${completed ? styles.completed : null}`}
    >
      <label
        htmlFor={`subtask-${selfId}`}
        className={styles.completed}
        tabIndex='1'
      >
        <span className='icon'>{completed ? <FiCheck /> : <FiCircle />}</span>
        <input
          type='checkbox'
          id={`subtask-${selfId}`}
          className={styles.check}
          onChange={handleComplete}
          data-id={selfId}
        />
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
