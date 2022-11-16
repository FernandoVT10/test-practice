"use client";

import { useState } from "react";
import { XCircleFillIcon } from "@primer/octicons-react";

import { useForm, FieldValues } from "react-hook-form";

import Modal, { useModal } from "@components/Modal";
import noteService, { CreateNoteData } from "@services/noteService";

import Input from "@components/Form/Input";
import Textarea from "@components/Form/Textarea";
import FormLoader from "@components/Form/Loader";

import styles from "./CreateNoteForm.module.scss";

type CreateNoteFormData = CreateNoteData & {
  form: string
}

export default function CreateNoteForm() {
  const {
    register,
    formState: { errors, isValid },
    setError,
    reset,
    handleSubmit
  } = useForm<CreateNoteFormData>({
    mode: "all",
    reValidateMode: "onSubmit"
  });

  const [loading, setLoading] = useState(false);

  const modal = useModal();

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    const success = await noteService.createNote({
      title: data.title,
      content: data.content
    });

    setLoading(false);

    if(success) {
      modal.hideModal();
      reset();
      return;
    }

    setError("form", {
      type: "custom",
      message: "There was an error trying to create your note."
    });
  };

  const formError = errors.form?.message;

  return (
    <div>
      <button onClick={() => modal.showModal()}>holiwis</button>

      <Modal title="Create Note" modal={modal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLoader loading={loading}/>

          <Input
            name="title"
            register={register}
            errors={errors}
            required
            placeholder="Enter a title"
            maxLength={50}
          />

          <Textarea
            name="content"
            register={register}
            errors={errors}
            required
            placeholder="Write something"
            maxLength={5000}
          />

          {formError &&
            <p className={styles.error}>
              <XCircleFillIcon size={12} verticalAlign="unset" className={styles.icon}/>
              { formError }
            </p>
          }

          <button
            type="submit"
            className="submit-button"
            disabled={!isValid}
          >
            Create Note
          </button>
        </form>
      </Modal>
    </div>
  );
}
