import styles from './delivery.module.css';

const DeliverySection = () => {
  return (
<div className={styles.main_delivery}>
  <section className={styles.section}>
    <h1 className={styles.section__title}>
      Reliable, efficient delivery
      <span>Powered by Technology</span>
    </h1>
    <p className={styles.section__desc}>Our Artificial Intelligence powered tools use millions of project data points to ensure that your project is successful</p>
    <div className={styles.features}>
      <div className={`${styles.feature} ${styles.featureOne}`}>
        <h2 className={styles.feature__title}>Supervisor</h2>
        <p className={styles.feature__desc}>Monitors activity to identify project roadblocks</p>
        <img className={styles.feature__img} src="https://kellychi22.github.io/frontend-mentor-solutions/10-four-card-feature-section/images/icon-supervisor.svg" alt="" />
      </div>
      <div className={styles.wrapper}>
        <div className={`${styles.feature} ${styles.featureTwo}`}>
          <h2 className={styles.feature__title}>Team Builder</h2>
          <p className={styles.feature__desc}>Scans our talent network to create the optimal team for your project</p>
          <img className={styles.feature__img} src="https://kellychi22.github.io/frontend-mentor-solutions/10-four-card-feature-section/images/icon-team-builder.svg" alt="" />
        </div>
        <div className={`${styles.feature} ${styles.featureThree}`}>
          <h2 className={styles.feature__title}>Karma</h2>
          <p className={styles.feature__desc}>Regularly evaluates our talent to ensure quality</p>
          <img className={styles.feature__img} src="https://kellychi22.github.io/frontend-mentor-solutions/10-four-card-feature-section/images/icon-karma.svg" alt="" />
        </div>
      </div>
      <div className={`${styles.feature} ${styles.featureFour}`}>
        <h2 className={styles.feature__title}>Calculator</h2>
        <p className={styles.feature__desc}>Uses data from past projects to provide better delivery estimates</p>
        <img className={styles.feature__img} src="https://kellychi22.github.io/frontend-mentor-solutions/10-four-card-feature-section/images/icon-calculator.svg" alt="" />
      </div>
    </div>
  </section>
  </div>

  );
};

export default DeliverySection;
