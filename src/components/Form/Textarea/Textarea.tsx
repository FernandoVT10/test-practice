import GenericInput, { ComponentProps } from "../GenericInput";

import styles from "./Textarea.module.scss";

function Textarea({
  error,
  register,
  placeholder,
  maxLength,
  dataTest
}: ComponentProps) {
  return (
    <textarea
      className={`${styles.textarea} ${error ? styles.invalid : ""}`}
      placeholder={placeholder}
      maxLength={maxLength}
      data-test={dataTest}
      {...register()}
    ></textarea>
  );
}

export default GenericInput(Textarea);
