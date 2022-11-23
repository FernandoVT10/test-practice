import Input from "@components/Form/Input";
import Textarea from "@components/Form/Textarea";
import Loader from "@components/Form/Loader";
import ErrorMessage from "@components/Form/ErrorMessage";

import Modal, { UseModalReturn } from "@components/Modal";

import { FieldErrors, UseFormRegister } from "react-hook-form";

interface NoteModalFormProps {
  prefix: "update" | "create",
  modalTitle: string,
  submitButtonText: string,
  errors: FieldErrors,
  isValid: boolean,
  loading: boolean,
  modal: UseModalReturn,
  onSubmit: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
}

export default function NoteModalForm({
  prefix,
  modalTitle,
  submitButtonText,
  errors,
  isValid,
  loading,
  modal,
  register,
  onSubmit
}: NoteModalFormProps) {
  const formError = errors.form?.message as string;

  return (
    <Modal title={modalTitle} modal={modal}>
      <form onSubmit={onSubmit}>
        <Loader loading={loading} />

        <Input
          name="title"
          errors={errors}
          register={register}
          placeholder="Enter a title"
          maxLength={50}
          dataTest={`${prefix}-note-title-input`}
          required
         />

        <Textarea
          name="content"
          register={register}
          errors={errors}
          placeholder="Write something"
          maxLength={5000}
          dataTest={`${prefix}-note-content-textarea`}
          required
        />

        <ErrorMessage error={formError}/>

        <button
          type="submit"
          className="submit-button"
          disabled={!isValid}
          data-test={`${prefix}-note-submit`}
        >
          {submitButtonText}
        </button>
      </form>
    </Modal>
  );
}
