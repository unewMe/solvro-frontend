

import styles from '../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Online Reading Room © {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;

  