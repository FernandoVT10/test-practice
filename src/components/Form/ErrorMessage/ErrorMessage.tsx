import { XCircleFillIcon } from "@primer/octicons-react";

import styles from "./ErrorMessage.module.scss";

export default function ErrorMessage({ error }: { error: string | undefined }) {
  if(!error) return null;

  return (
    <p className={styles.errorMessage}>
      <XCircleFillIcon size={12} verticalAlign="unset" className={styles.icon}/>
      { error }
    </p>
  );
}
