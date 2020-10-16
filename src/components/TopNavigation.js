import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiMenu, FiX } from 'react-icons/fi';

import { Logo } from '.';

import styles from '../styles/navigation.module.css';

const TopNavigation = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => setMenu(!menu);

  return (
    <nav className={styles.top_nav}>
      <Link to='/' className={styles.top_nav__logo}>
        <Logo size='medium' />
      </Link>
      <ul
        className={`${styles.top_nav__links} ${
          menu ? styles.show_menu : styles.hide_menu
        }`}
      >
        <button
          className={`${styles.menu_btn} ${styles.menu_btn__close}`}
          aria-hidden='true'
          onClick={handleMenu}
        >
          <span className='icon'>
            <FiX />
          </span>
        </button>
        <li>
          <Link to='/' className={styles.nav_link}>
            Home
          </Link>
        </li>
        <li>
          <Link to='/about' className={styles.nav_link}>
            about us
          </Link>
        </li>
        <li>
          <a
            href='https://thisiseric.netlify.app'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.nav_link}
          >
            portfolio
          </a>
        </li>
        <li>
          <a
            href='https://github.com/erimaga/thekat-version-2'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.nav_link}
          >
            <span className='icon'>
              <FiGithub />
            </span>
          </a>
        </li>
      </ul>

      <button
        className={styles.menu_btn}
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
