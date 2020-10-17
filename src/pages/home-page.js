import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import { ListContext } from '../store';

import styles from '../styles/home.module.css';

import catIllustration from '../images/orange-tabby-cat.png';

const Home = () => {
  const [list, setList] = useState('');
  const [lists, setLists] = useState([]);
  const {
    CURRENTLY_ACTIVE,
    ADD_ITEM,
    GET_LISTS,
    activeList,
    list: allLists,
  } = useContext(ListContext);

  useEffect(() => {
    const data = GET_LISTS();
    if (data.length > 0) {
      const recent = data.splice(data.length - 4);
      setLists(recent);
    }
  }, [GET_LISTS, activeList, allLists]);

  let history = useHistory();

  const handleTitleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'list') setList(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (list.length !== 0) {
      await ADD_ITEM('list', list);
      const data = await GET_LISTS();
      CURRENTLY_ACTIVE('list', data[0].id);
      setList('');
      history.push('/list/');
    }
  };

  const handleListChange = (e) => {
    const { id } = e.target;
    CURRENTLY_ACTIVE('list', id);
    history.push(`/list/`);
  };

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div className={styles.left_wrapper}>
          <header className={`header ${styles.header}`}>
            <h1 className='large-title'>Thekat</h1>
            <p>Track. Oragnise. Plan.</p>
          </header>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className='form_group'>
              <label htmlFor='list' className={styles.form_label}>
                Let's get started by giving your list a name.
              </label>
              <input
                className='form_control'
                name='list'
                id='list'
                type='text'
                placeholder='Tip: The shorter the better.'
                required
                autoComplete='off'
                value={list}
                onChange={handleTitleChange}
              />
            </div>
            <button
              type='submit'
              className={`form_submit ${styles.form_submit}`}
            >
              I'm ready
            </button>
          </form>
        </div>
        <div className={styles.right_wrapper}>
          {lists.length ? (
            <div className={styles.home_lists}>
              <p className={styles.home_links__title}>your recent lists</p>
              <div className={styles.home_lists__links}>
                {lists.map((list) => (
                  <button
                    className={styles.home_lists__link}
                    id={list.id}
                    key={list.id}
                    onClick={handleListChange}
                  >
                    {list.title}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <div className={styles.illustration}>
            <img
              src={catIllustration}
              alt='illustration of a happy orange tabby cat'
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
