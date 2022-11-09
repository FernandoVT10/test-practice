"use client";

import UserForm, { OnFormSubmitFn } from "@components/UserForm";
import { useRouter } from "next/navigation";

import api from "@utils/api";

import styles from "@styles/FormWrapper.module.scss";

export default function Register() {
  const router = useRouter();

  const onFormSubmit: OnFormSubmitFn = async (data, setError) =>  {
    const { statusCode, response } = await api.post("user/register", data);

    if(statusCode === 200) {
      router.push("/login#registerSuccess");
    } else if(statusCode === 400) {
      if(response.errors && response.errors.length > 0) {
        const { field, message } = response.errors[0];

        setError(field, {
          type: "custom",
          message
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
