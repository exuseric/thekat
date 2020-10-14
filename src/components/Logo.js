import React from 'react';

import logo from '../images/logo.svg';

const Logo = ({ size }) => (
  <img
    src={logo}
    alt='cat silhouette with a red background'
    className={`${size}-logo`}
  />
);

export default Logo;
