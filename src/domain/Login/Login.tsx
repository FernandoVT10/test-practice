import Form from "./Form";

import styles from "./Login.module.scss";

export default function Login() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.formContainer}>
        <Form/>
      </div>
    </section>
  );
}
