import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiMenu, FiX } from 'react-icons/fi';

import { Logo } from '.';

import navStyles from '../styles/navigation.module.css';

const TopNavigation = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => setMenu(!menu);

  return (
    <nav className={navStyles.default_nav}>
      <Link to='/' className={navStyles.default_nav__logo}>
        <Logo size='medium' />
      </Link>
      <ul
        className={`${navStyles.default_nav__links} ${
          menu ? navStyles.show_menu : navStyles.hide_menu
        }`}
      >
        <button
          className={`${navStyles.menu_btn} ${navStyles.menu_btn__close}`}
          aria-hidden='true'
          onClick={handleMenu}
        >
          <span className='icon'>
            <FiX />
          </span>
        </button>
        <li>
          <Link to='/' className={navStyles.default_nav__link}>
            Home
          </Link>
        </li>
        <li>
          <Link to='/about' className={navStyles.default_nav__link}>
            about us
          </Link>
        </li>
        <li>
          <a
            href='https://thisiseric.netlify.app'
            target='_blank'
            rel='noopener noreferrer'
            className={navStyles.default_nav__link}
          >
            portfolio
          </a>
        </li>
        <li>
          <a
            href='https://github.com/erimaga/thekat-version-2'
            target='_blank'
            rel='noopener noreferrer'
            className={navStyles.default_nav__link}
          >
            <span className='icon'>
              <FiGithub />
            </span>
          </a>
        </li>
      </ul>

      <button
        className={navStyles.menu_btn}
        aria-hidden='true'
        onClick={handleMenu}
      >
        <span className='icon'>
          <FiMenu />
        </span>
      </button>
    </nav>
  );
};

export default TopNavigation;
