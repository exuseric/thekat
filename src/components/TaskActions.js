import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';

import { ListContext } from '../store';

import styles from '../styles/navigation.module.css';

const TaskActions = () => {
  const {
    activeTask,
    CURRENTLY_ACTIVE,
    SHOW_FORM,
    GET_TASKS,
    DELETE_ITEM,
  } = useContext(ListContext);

  const [showActions, setShowActions] = useState(true);
  const [showLinks, setShowLinks] = useState(false);
  const [tasks, setTasks] = useState([]);

  let history = useHistory();

  useEffect(() => {
    const data = GET_TASKS('task', activeTask);
    if (data !== undefined) setTasks(data);
  }, [GET_TASKS, activeTask]);

  const handleDropdownActions = () => {
    setShowActions(!showActions);
    setShowLinks(false);
  };
  const handleDropdownLinks = () => {
    setShowLinks(!showLinks);
    setShowActions(false);
  };

  const handleTaskChange = (e) => CURRENTLY_ACTIVE('task', e.target.id);

  const handleForm = (e) => SHOW_FORM(e.target.id, true);

  const handleDelete = async (e) => {
    DELETE_ITEM('task', activeTask);
    const updated = GET_TASKS('task', activeTask);
    if (updated.length > 0) {
      const lastTask = updated[0];
      await CURRENTLY_ACTIVE('task', lastTask.id);
      history.goBack();
    }
  };

  return (
    <div className='task_actions'>
      <div className={styles.dropdown} id='options' tab-index='1'>
        <p
          className={`mid-title ${styles.dropdown_title}`}
          onClick={handleDropdownActions}
        >
          <span>Task Options </span>
          <span className='icon'>
            {showActions ? <FiChevronUp /> : <FiChevronDown />}
          </span>
        </p>
        <div
          className={`${styles.dropdown_actions} ${
            showActions ? styles.dropdown_show : styles.dropdown_hide
          }`}
        >
          <button
            type='button'
            className={`${styles.dropdown_action} ${styles.dropdown_action__add}`}
            id='subtask'
            onClick={handleForm}
          >
            <span> add a subtask</span>
            <span className='icon'>
              <FiPlus />
            </span>
          </button>
          <button
            className={`${styles.dropdown_action} ${styles.dropdown_action__rename}`}
            id='rename task'
            onClick={handleForm}
          >
            <span> rename task </span>
            <span className='icon'>
              <FiEdit2 />
            </span>
          </button>
          <button
            type='button'
            className={`${styles.dropdown_action} ${styles.dropdown_action__delete}`}
            onClick={handleDelete}
          >
            <span> delete task </span>
            <span className='icon'>
              <FiTrash2 />
            </span>
          </button>
        </div>
      </div>
      <div className={styles.dropdown} id='links' tab-index='1'>
        <p
          className={`mid-title ${styles.dropdown_title}`}
          onClick={handleDropdownLinks}
        >
          <span>My Tasks</span>
          <span className='icon'>{tasks.length}</span>
        </p>
        <div
          className={`${styles.dropdown_actions} ${
            showLinks ? styles.dropdown_show : styles.dropdown_hide
          }`}
        >
          {tasks.map((task) => (
            <button
              className={`${styles.dropdown_links__link} ${
                task.id === parseInt(activeTask)
                  ? styles.dropdown_links__link_active
                  : null
              }`}
              id={task.id}
              key={task.id}
              onClick={handleTaskChange}
            >
              <span>{task.title}</span>
              {task.id === parseInt(activeTask) ? (
                <span
                  className={`icon ${styles.dropdown_links__icon}`}
                  role='img'
                  aria-label='cat emoji'
                >
                  🐱
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskActions;
