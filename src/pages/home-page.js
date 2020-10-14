import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import { ListContext } from '../strore';

import homeStyles from '../styles/home.module.css';

import catIllustration from '../images/orange-tabby-cat.png';

const Home = () => {
  const [list, setList] = useState('');
  const { ADD_ITEM } = useContext(ListContext);

  let history = useHistory();

  const handleTitleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'list') setList(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (list.length !== 0) {
      ADD_ITEM('list', list);
      setList('');
      history.push(`/list/${list}/`);
    }
  };

  return (
    <DefaultLayout>
      <div className={homeStyles.container}>
        <div className={homeStyles.left_wrapper}>
          <header className={`header ${homeStyles.header}`}>
            <h1 className='large-title'>Thekat</h1>
            <p>Track. Oragnise. Plan.</p>
          </header>
          <form className={homeStyles.form} onSubmit={handleSubmit}>
            <div className={homeStyles.form_group}>
              <label htmlFor='list' className={homeStyles.form_label}>
                Let's get started by giving your list a name.
              </label>
              <input
                className={`form-control ${homeStyles.form_control}`}
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
            <button type='submit' className={homeStyles.form_submit}>
              I'm ready
            </button>
          </form>
        </div>
        <div className={homeStyles.right_wrapper}>
          <div className={homeStyles.illustration}>
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
