"use client";

import UserForm, { OnFormSubmitFn } from "@components/UserForm";
import { useRouter } from "next/navigation";

import userService from "@services/userService";

import styles from "@styles/FormWrapper.module.scss";

export default function Register() {
  const router = useRouter();

  const onFormSubmit: OnFormSubmitFn = async (data, setError) =>  {
    const { statusCode, response } = await userService.register({
      username: data.username,
      password: data.password
    });

    if(statusCode === 200) {
      router.push("/login?register=success");
    } else if(statusCode === 400) {
      if(response.errors && response.errors.length > 0) {
        const { field, message } = response.errors[0];

        setError(field, {
          type: "custom",
          message
        });
      }
    } else {
      if(response.message) {
        setError("form", {
          type: "custom",
          message: response.message
        });
      }
    }
  };

  return (
    <section className={styles.formWrapper}>
      <div className={styles.formContainer}>
        <UserForm
          formType="register"
          onFormSubmit={onFormSubmit}
        />
      </div>
    </section>
  );
}
