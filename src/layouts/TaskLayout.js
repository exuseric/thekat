import React, { useContext } from 'react';

import { SideNavigation, AddNewForm } from '../components';

import layoutStyles from '../styles/layouts.module.css';
import { ListContext } from '../store';

const TaskLayout = ({ children, page }) => {
  const { form } = useContext(ListContext);

  return (
    <div className={layoutStyles.task_layout__container}>
      <div className={layoutStyles.task_layout__navigation}>
        <SideNavigation action={page} />
      </div>
      <div className={layoutStyles.task_layout__child}>
        {form.visible ? <AddNewForm /> : null}
        {children}
      </div>
    </div>
  );
};

export default TaskLayout;
