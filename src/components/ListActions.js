import React, { useState, useContext, useEffect } from 'react';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';

import { ListContext } from '../store';

import styles from '../styles/navigation.module.css';

const ListActions = () => {
  const {
    activeList,
    CURRENTLY_ACTIVE,
    SHOW_FORM,
    GET_LISTS,
    DELETE_ITEM,
  } = useContext(ListContext);

  const [showActions, setShowActions] = useState(true);
  const [showLinks, setShowLinks] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const data = GET_LISTS();
    if (data !== undefined) setLists(data);
  }, [GET_LISTS, activeList]);

  const handleDropdownActions = () => {
    setShowActions(!showActions);
    setShowLinks(false);
  };
  const handleDropdownLinks = () => {
    setShowLinks(!showLinks);
    setShowActions(false);
  };

  const handleListChange = (e) => CURRENTLY_ACTIVE('list', e.target.id);

  const handleForm = (e) => SHOW_FORM(e.target.id, true);

  const handleDelete = async (e) => {
    DELETE_ITEM('list', activeList);
    const updated = GET_LISTS();
    if (updated.length > 0) {
      const lastList = updated[0];
      CURRENTLY_ACTIVE('list', lastList.id);
    }
  };

  return (
    <div className='list_actions'>
      <div className={styles.dropdown} id='options' tab-index='1'>
        <p
          className={`mid-title ${styles.dropdown_title}`}
          onClick={handleDropdownActions}
        >
          <span>List Options</span>
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
            id='list'
            onClick={handleForm}
          >
            <span> create a new list</span>
            <span className='icon'>
              <FiPlus />
            </span>
          </button>
          <button
            className={`${styles.dropdown_action} ${styles.dropdown_action__add}`}
            id='task'
            onClick={handleForm}
          >
            <span> add a task </span>
            <span className='icon'>
              <FiPlus />
            </span>
          </button>
          <button
            className={`${styles.dropdown_action} ${styles.dropdown_action__rename}`}
            id='rename list'
            onClick={handleForm}
          >
            <span> rename list </span>
            <span className='icon'>
              <FiEdit2 />
            </span>
          </button>
          <button
            type='button'
            className={`${styles.dropdown_action} ${styles.dropdown_action__delete}`}
            onClick={handleDelete}
          >
            <span> delete list </span>
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
          <span>My Lists</span>
          <span className='icon'>{lists.length}</span>
        </p>
        <div
          className={`${styles.dropdown_actions} ${
            showLinks ? styles.dropdown_show : styles.dropdown_hide
          }`}
        >
          {lists.map((list) => (
            <button
              className={`${styles.dropdown_links__link} ${
                list.id === parseInt(activeList)
                  ? styles.dropdown_links__link_active
                  : null
              }`}
              id={list.id}
              key={list.id}
              onClick={handleListChange}
            >
              <span>{list.title}</span>
              {list.id === parseInt(activeList) ? (
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

export default ListActions;
