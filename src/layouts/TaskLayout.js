import React from 'react';

import { SideNavigation } from '../components';

import layoutStyles from '../styles/layouts.module.css';

const TaskLayout = ({ children }) => {
  return (
    <div class={layoutStyles.task_layout__container}>
      <SideNavigation />
      <div class={layoutStyles.task_layout__child}>{children}</div>
    </div>
  );
};

export default TaskLayout;
