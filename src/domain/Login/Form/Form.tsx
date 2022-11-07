"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { XCircleFillIcon } from "@primer/octicons-react";
import { useForm, FieldValues } from "react-hook-form";

import Link from "next/link";
import api from "@utils/api";
import Input from "@components/Form/Input";

import styles from "./Form.module.scss";

type FormData = {
  username: string,
  password: string,
  form: string
}

export default function Form() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid }
  } = useForm<FormData>({
    mode: "all",
    reValidateMode: "onSubmit"
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    try {
      const { statusCode, response } = await api.post("user/login", data);

      setLoading(false);

      if(statusCode === 400) {
        return setError("form", {
          type: "custom",
          message: response.message
        });
      }
    } catch {
      return setError("form", {
        type: "custom",
        message: "There was an error. Try again later."
      });
    }

    router.push("/");
  };

  const handleOnClick = () => isValid && clearErrors();

  const error = errors.form?.message as string;

  return (
    <div className={styles.formContainer}>
      { loading &&
        <div className={styles.loaderContainer}>
          <span className={styles.loader}></span>
        </div>
      }

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Login</h1>

        <Input
          name="username"
          placeholder="Enter your username"
          maxLength={20}
          errors={errors}
          register={register}
          required
        />

        <Input
          name="password"
          errors={errors}
          register={register}
          type="password"
          placeholder="Enter your password"
          required
        />

        {error &&
          <p className={styles.error}>
            <XCircleFillIcon size={12} verticalAlign="unset" className={styles.icon}/>
            { error }
          </p>
        }

        <button
          className={styles.button}
          onClick={handleOnClick}
          disabled={!isValid}
        >
          Login
        </button>

        <p className={styles.adviceText}>
          Or you can&nbsp;
          <Link href="/register" className={styles.link}>create an account</Link>&nbsp;
          if you don&apos;t have one.
        </p>
      </form>
    </div>
  );
}
