"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@components/Modal";
import { PlusIcon } from "@primer/octicons-react";

import { useForm, FieldValues } from "react-hook-form";

import noteService, { CreateNoteData } from "@services/noteService";

import NoteModalForm from "../NoteModalForm";

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
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    const success = await noteService.createNote({
      title: data.title,
      content: data.content
    });

    setLoading(false);

    if(success) {
      modal.hideModal();
      router.refresh();
      return reset();
    }

    setError("form", {
      type: "custom",
      message: "There was an error trying to create your note."
    });
  };

  return (
    <div className={styles.createNoteForm}>
      <button
        className={styles.addNoteButton}
        onClick={() => modal.showModal()}
        data-test="add-note-button"
      >
        <PlusIcon size={18}/>
      </button>

      <NoteModalForm
        prefix="create"
        modalTitle="Create Note"
        submitButtonText="Create Note"
        errors={errors}
        isValid={isValid}
        loading={loading}
        modal={modal}
        register={register}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
  );
}
