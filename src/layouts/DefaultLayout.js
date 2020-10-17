import React from 'react';

import { TopNavigation, Footer } from '../components';

import layoutStyles from '../styles/layouts.module.css';

const DefaultLayout = ({ children }) => {
  return (
    <div className={layoutStyles.default_layout__container}>
      <TopNavigation />
      <div className={layoutStyles.default_layout__child}>{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
