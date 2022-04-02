import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Home } from "../components/Home";
import { About } from "../components/About";
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
