import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Logo } from '.';
import links from '../data/routes';
import styles from '../styles/navigation.module.css';

const TopNavigation = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => setMenu(!menu);

  return (
    <nav
      className={styles.top_nav}
      role='navigation'
      aria-label='page navigation'
    >
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
        {links
          .filter((l) => !l.external)
          .map((link) => (
            <li key={link.path}>
              <Link to={link.path} className={styles.nav_link}>
                {link.name}
              </Link>
            </li>
          ))}
        {links
          .filter((l) => l.external)
          .map((link) => (
            <li key={link.path}>
              <a
                className={styles.nav_link}
                href={link.path}
                target='_blank'
                rel='noopener noreferrer'
              >
                {link.name !== 'react' ? link.name : null}
              </a>
            </li>
          ))}
        <li>
          <Link
            to='/list/'
            className={`${styles.nav_link} ${styles.nav_list_link}`}
          >
            My lists.
          </Link>
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
