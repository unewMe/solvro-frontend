'use client';

import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styles from '../styles/home.module.css';
import Hero from '../components/Hero';

const Page = () => {
  return (
    <div className= {styles.background_container}>
    <div className={styles.background_overlay}></div>
      <NavBar />
      <div className={styles.page_container}>
        <Hero />
      </div>
      <Footer />
    </div>
  );
};

export default Page;