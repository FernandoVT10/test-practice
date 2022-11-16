import styles from "./Loader.module.scss";

export default function Loader({
  loading
}: { loading: boolean }) {
  if(!loading) return null;

  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
}
