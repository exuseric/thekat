import React from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

import styles from '../styles/navigation.module.css';

const TaskActions = () => {
  return (
    <div className={styles.dropdown}>
      <p className={`mid-title ${styles.dropdown_title}`}>Task Options.</p>
      <div className={styles.dropdown_actions}>
        <button
          className={`${styles.dropdown_action} ${styles.dropdown_action__add}`}
        >
          <span>add a subtask</span>
          <span className='icon'>
            <FiPlus />
          </span>
        </button>
        <button
          className={`${styles.dropdown_action} ${styles.dropdown_action__rename}`}
        >
          <span>rename task</span>
          <span className='icon'>
            <FiEdit2 />
          </span>
        </button>
        <button
          className={`${styles.dropdown_action} ${styles.dropdown_action__delete}`}
        >
          <span>delete task</span>
          <span className='icon'>
            <FiTrash2 />
          </span>
        </button>
      </div>
    </div>
  );
};

export default TaskActions;
