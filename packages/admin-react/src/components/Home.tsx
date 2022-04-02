import React from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.svg';
import styles from './Home.module.css';

export function Home() {
  return (
    <>
      <main>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className={styles.link}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}
