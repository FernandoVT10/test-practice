import { XCircleFillIcon } from "@primer/octicons-react";
import { UseFormRegister, UseFormRegisterReturn, FieldErrors } from "react-hook-form";

import styles from "./GenericInput.module.scss";

interface CommonProps {
  placeholder: string,
  maxLength: number,
  type?: React.HTMLProps<HTMLInputElement>["type"]
}

interface GenericInputProps extends CommonProps {
  name: string,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>,
  errors: FieldErrors,
  required?: boolean,
}

export interface ComponentProps extends CommonProps {
  error: string,
  register: () => UseFormRegisterReturn,
}

function getRequiredMessage(name: string): string {
  const newName = name.charAt(0).toUpperCase() + name.slice(1);

  return `${newName} is required`;
}

export default function GenericInput(Component: React.FC<ComponentProps>) {
  return function ({
    name,
    register,
    errors,
    required,
    placeholder,
    maxLength,
    type
  }: GenericInputProps) {
    const error = errors[name]?.message as string;

    const applyRegister = () => register(name, {
      required: required ? getRequiredMessage(name) : false
    });

    return (
      <div className={styles.genericInputContainer}>
        <Component
          error={error}
          register={applyRegister}
          placeholder={placeholder}
          maxLength={maxLength}
          type={type}
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
}
