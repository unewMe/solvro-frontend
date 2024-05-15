import styles from "../styles/hero.module.css";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Welcome to the Online Reading Room</h1>
        <p className={styles.heroSubtitle}>
          Find your next adventure in a book
        </p>
      </div>
    </div>
  );
};

export { Hero };
