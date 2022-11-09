"use client";

import UserForm, { OnFormSubmitFn } from "@components/UserForm";
import { useRouter } from "next/navigation";

import api from "@utils/api";

import styles from "@styles/FormWrapper.module.scss";

export default function Login() {
  const router = useRouter();

  const onFormSubmit: OnFormSubmitFn = async (data, setError) => {
    const { statusCode, response } = await api.post("user/login", data);

    if(statusCode === 200) {
      router.push("/");
    } else if(statusCode === 400) {
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
