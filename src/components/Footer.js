import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaReact, FaBriefcase } from 'react-icons/fa';

import links from '../data/routes';
import styles from '../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.page_links}>
          <p className={`mid-title ${styles.links_title}`}>Quick Links</p>
          <ul className={styles.links}>
            {links
              .filter((l) => !l.external)
              .map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={styles.link}>
                    {link.name}
                  </Link>
                </li>
              ))}
            {links
              .filter((l) => l.external)
              .map((link) => (
                <li key={link.path}>
                  <a
                    className={styles.link}
                    href={link.path}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {link.name === 'github' ? <FaGithub /> : null}
                    {link.name === 'react' ? <FaReact /> : null}
                    {link.name === 'portfolio' ? <FaBriefcase /> : null}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Eric Maina.</p>
      </div>
    </footer>
  );
};

export default Footer;
