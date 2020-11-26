import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ListActions, Logo, TaskActions } from '.';
import styles from '../styles/navigation.module.css';

const SideNavigation = ({ action }) => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => setMenu(!menu);
  return (
    <nav
      className={styles.side_nav}
      role='navigation'
      aria-label='list navigation'
    >
      <div className={styles.side_nav__top}>
        <Link to='/' className={styles.side_nav__logo}>
          <Logo size='medium' />
        </Link>
        <button
          className={styles.menu_btn}
          aria-hidden='true'
          onClick={handleMenu}
        >
          <span className='icon'>
            <FiMenu />
          </span>
        </button>
      </div>
      <div
        className={`${styles.side_nav__bottom} ${
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
        <ul className={styles.side_nav__links}>
          <li>
            <Link to='/about' className={styles.nav_link}>
              About us
            </Link>
          </li>
        </ul>
        <div className={styles.side_nav__actions}>
          {action === 'list' ? <ListActions /> : null}
          {action === 'task' ? <TaskActions /> : null}
        </div>
      </div>
    </nav>
  );
};

export default SideNavigation;
