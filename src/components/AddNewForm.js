import React, { useContext, useState } from 'react';

import { ListContext } from '../store';

import styles from '../styles/form.module.css';

const AddForm = () => {
  const {
    form,
    SHOW_FORM,
    ADD_ITEM,
    RENAME_ITEM,
    GET_LISTS,
    CURRENTLY_ACTIVE,
  } = useContext(ListContext);
  const [title, setTitle] = useState('');

  const handleClose = () => {
    setTitle('');
    SHOW_FORM(null, false);
  };
  const handleTitle = (e) => setTitle(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      title.length !== 0 &&
      form.type !== 'rename list' &&
      form.type !== 'rename task'
    ) {
      await ADD_ITEM(form.type, title);
      if (form.type === 'list') {
        const data = GET_LISTS();
        CURRENTLY_ACTIVE('list', data[0].id);
      }
      handleClose();
    }

    if (
      title.length !== 0 &&
      (form.type === 'rename list' || form.type === 'rename task')
    ) {
      RENAME_ITEM({ type: form.type.replace('rename', '').trim(), title });
      handleClose();
    }
  };

  return (
    <div className={styles.add_form__container}>
      <form className={styles.add_form} onSubmit={handleSubmit}>
        <div className='form_group'>
          <label htmlFor='title'>Enter the title</label>
          <input
            type='text'
            id='title'
            className='form_control'
            placeholder='New title'
            required
            autoComplete='off'
            autoFocus='on'
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className={`form_group ${styles.form_group__actions}`}>
          <button className={`form_submit ${styles.form_submit}`}>Save</button>
          <button
            type='button'
            className={styles.form_cancel}
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
