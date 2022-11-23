"use client";

import UserForm, { OnFormSubmitFn } from "@components/UserForm";
import { useRouter } from "next/navigation";

import userService from "@services/userService";

import styles from "@styles/FormWrapper.module.scss";

export default function Login() {
  const router = useRouter();

  const onFormSubmit: OnFormSubmitFn = async (data, setError) => {
    const { statusCode, response } = await userService.login({
      username: data.username,
      password: data.password
    });

    if(statusCode === 200) {
      return router.push("/");
    } else if(response.message) {
      setError("form", {
        type: "custom",
        message: response.message
      });
    }
  };

  return (
    <section className={styles.formWrapper}>
      <div className={styles.formContainer}>
        <UserForm
          formType="login"
          onFormSubmit={onFormSubmit}
        />
      </div>
    </section>
  );
}
