import React from 'react';
import Layout from '../layouts/DefaultLayout';
import styles from '../styles/about.module.css';

const About = () => {
  return (
    <Layout>
      <header className={styles.header}>
        <h1 className='large-title'>About Thekat.</h1>
        <h2 className='mid-title'>
          <span>Track. Organise. Plan.</span>
        </h2>
        <p>
          A project by
          <a
            href='https://thisiseric.netlify.app'
            target='_blank'
            rel='noopener noreferrer'
            className='link'
          >
            Eric Maina.
          </a>
        </p>
      </header>
      <div className={styles.about_content}>
        <section>
          <p>
            Thekat is a task web application that enables users to create a
            list(s) that contains a collection of tasks which can optionally
            have multiple subtasks.
          </p>
          <p>
            Checkout the source code for the project on
            <a
              href='https://github.com/erimaga/thekat-version-2'
              target='_blank'
              rel='noopener noreferrer'
              className='link'
            >
              github.
            </a>
          </p>
        </section>
        <section>
          <p>
            Thekat is made the
            <a
              href='https://reactjs.org'
              target='_blank'
              rel='noopener noreferrer'
              className='link'
            >
              react.js
            </a>
            library and utilizes the browsers
            <span className='link'>local storage</span> for persistent data.
          </p>
          <p>
            Using the browsers local storage comes with the shortcoming of
            having the lists and tasks restricted to one specific browsers —the
            browser it was created on—
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default About;
