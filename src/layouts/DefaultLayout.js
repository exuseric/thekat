import React from 'react';

import { TopNavigation } from '../components';

import layoutStyles from '../styles/layouts.module.css';

const DefaultLayout = ({ children }) => {
  return (
    <div className={layoutStyles.default_layout__container}>
      <TopNavigation />
      <div className={layoutStyles.default_layout__child}>{children}</div>
    </div>
  );
};

export default DefaultLayout;
