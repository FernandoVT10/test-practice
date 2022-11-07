import { XCircleFillIcon } from "@primer/octicons-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import styles from "./Input.module.scss";

type InputProps = {
  name: string,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>,
  errors: FieldErrors,
  required?: boolean
} & React.HTMLProps<HTMLInputElement>;

function getRequiredMessage(name: string): string {
  const newName = name.charAt(0).toUpperCase() + name.slice(1);

  return `${newName} is required`;
}

export default function Input({
  name,
  register,
  errors,
  required,
  ...inputProps
}: InputProps) {
  const error = errors[name]?.message as string;

  return (
    <div className={styles.inputContainer}>
      <input
        className={`${styles.input} ${error ? styles.invalid : "" }`}
        {...inputProps}

        {...register(name, { required: required ? getRequiredMessage(name) : false })}
      />

      {error &&
        <p className={styles.error}>
          <XCircleFillIcon size={12} verticalAlign="unset" className={styles.icon}/>
          { error }
        </p>
      }
    </div>
  );
}
