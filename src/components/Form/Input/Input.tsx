import GenericInput, { ComponentProps } from "../GenericInput";
import styles from "./Input.module.scss";

function Input({
  error,
  register,
  placeholder,
  maxLength,
  type
}: ComponentProps) {
  return (
    <input
      type={type || "text"}
      className={`${styles.input} ${error ? styles.invalid : "" }`}
      maxLength={maxLength}
      placeholder={placeholder}
      {...register()}
    />
  );
}

export default GenericInput(Input);
