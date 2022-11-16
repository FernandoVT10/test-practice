"use client";

import React, { useState } from "react";

import { XCircleFillIcon } from "@primer/octicons-react";
import { useSearchParams } from "next/navigation";

import { useForm, FieldValues, UseFormSetError } from "react-hook-form";

import Link from "next/link";
import Input from "@components/Form/Input";
import Loader from "@components/Form/Loader";

import styles from "./UserForm.module.scss";

type UserFormData = {
  username: string,
  password: string,
  form: string
}

export type OnFormSubmitFn = (
  data: FieldValues,
  setError: UseFormSetError<UserFormData>
) => Promise<void>;

type UserFormProps = {
  formType: "register" | "login",
  onFormSubmit: OnFormSubmitFn
}

export default function UserForm({
  formType,
  onFormSubmit
}: UserFormProps) {
  const [loading, setLoading] = useState(false);
  
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid }
  } = useForm<UserFormData>({
    mode: "all",
    reValidateMode: "onSubmit"
  });

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    try {
      await onFormSubmit(data, setError);
    } catch {
      setError("form", {
        type: "custom",
        message: "There was an error. Try again later."
      });
    }

    setLoading(false);
  };

  const handleOnClick = () => isValid && clearErrors();

  const error = errors.form?.message as string;

  return (
    <>
      { searchParams.get("register") === "success" &&
        <p className={styles.successMessage}>
          You have been registered successfully.
        </p>
      }

      <div className={styles.formContainer}>
        <Loader loading={loading}/>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.title}>
            { formType === "login" ? "Login" : "Register" }
          </h1>

          <Input
            name="username"
            placeholder="Enter your username"
            maxLength={20}
            errors={errors}
            register={register}
            data-test="username-input"
            required
          />

          <Input
            name="password"
            errors={errors}
            register={register}
            type="password"
            placeholder="Enter your password"
            data-test="password-input"
            required
          />

          {error &&
            <p className={styles.error}>
              <XCircleFillIcon size={12} verticalAlign="unset" className={styles.icon}/>
              { error }
            </p>
          }

          <button
            className="submit-button"
            onClick={handleOnClick}
            disabled={!isValid}
            data-test="submit"
          >
            { formType === "login" ? "Login" : "Register" }
          </button>

          { formType === "login" ?
            <p className={styles.adviceText}>
              Or you can&nbsp;
              <Link href="/register" className={styles.link}>create an account</Link>&nbsp;
              if you don&apos;t have one.
            </p>
            :
            <p className={styles.adviceText}>
              If you already have an account, you can&nbsp;
              <Link href="/login" className={styles.link}>login here</Link> instead.
            </p>
          }
        </form>
      </div>
    </>
  );
}
