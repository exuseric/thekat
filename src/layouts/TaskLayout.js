import React from 'react';

import { SideNavigation } from '../components';

import layoutStyles from '../styles/layouts.module.css';

const TaskLayout = ({ children, page }) => {
  return (
    <div class={layoutStyles.task_layout__container}>
      <div className={layoutStyles.task_layout__navigation}>
        <SideNavigation action={page} />
      </div>
      <div class={layoutStyles.task_layout__child}>{children}</div>
    </div>
  );
};

export default TaskLayout;
