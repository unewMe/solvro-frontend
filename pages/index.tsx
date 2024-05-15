"use client";

import React from "react";

import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { NavBar } from "../components/NavBar";
import styles from "../styles/Home.module.css";

const Page = () => {
  return (
    <div className={styles.background_container}>
      <div className={styles.background_overlay} />
      <NavBar />
      <div className={styles.page_container}>
        <Hero />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
