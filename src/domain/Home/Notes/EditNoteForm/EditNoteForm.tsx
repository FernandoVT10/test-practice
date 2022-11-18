"use client";

import { UseModalReturn } from "@components/Modal";
import noteService, { Note, UpdateNoteData } from "@services/noteService";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

import NoteModalForm from "@domain/Home/NoteModalForm";

interface EditNoteFormProps {
  editModal: UseModalReturn,
  editingNote: Note | undefined
}

type EditNoteFormData = UpdateNoteData & {
  form: string
}

export default function EditNoteForm({ editModal, editingNote }: EditNoteFormProps) {
  const {
    register,
    formState: { errors, isValid },
    setValue,
    setError,
    handleSubmit
  } = useForm<EditNoteFormData>({
    mode: "all",
    reValidateMode: "onSubmit"
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if(editingNote) {
      setValue("title", editingNote.title);
      setValue("content", editingNote.content);
    }

    // eslint-disable-next-line
  }, [editingNote]);

  const onSubmit = async (data: FieldValues) => {
    if(!editingNote) return;

    setLoading(true);

    const isUpdated = await noteService.updateNote(editingNote._id, {
      title: data.title,
      content: data.content
    });

    setLoading(false);

    if(isUpdated) {
      editModal.hideModal();
      return router.refresh();
    }

    setError("form", {
      type: "custom",
      message: "There was an error trying to update your note"
    });
  };

  return (
    <NoteModalForm
      modalTitle="Edit Note"
      submitButtonText="Update Note"
      errors={errors}
      isValid={isValid}
      loading={loading}
      modal={editModal}
      register={register}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
