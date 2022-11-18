"use client";

import Loader from "@components/Form/Loader";
import Modal, { UseModalReturn } from "@components/Modal";
import noteService, { Note } from "@services/noteService";

import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./DeleteNote.module.scss";

interface DeleteNoteProps {
  deleteModal: UseModalReturn,
  deletingNote: Note | undefined
}

export default function DeleteNote({
  deleteModal,
  deletingNote
}: DeleteNoteProps) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const noteTitle = deletingNote?.title || "Default title";

  const deleteNote = async () => {
    if(!deletingNote) return;

    setLoading(true);

    const isDeleted = await noteService.deleteNote(deletingNote._id);

    setLoading(false);

    if(isDeleted) {
      deleteModal.hideModal();
      router.refresh();
    }
  };

  return (
    <Modal title="Are sure about it?" modal={deleteModal}>
      <div className={styles.deleteNote}>
        <Loader loading={loading}/>

        <p className={styles.text}>
          The <b>&quot;{ noteTitle }&quot;</b> note will be deleted,
          and this action cannot be undone.<br/>
          Are you sure about it?
        </p>

        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.cancel}`}
            onClick={() => deleteModal.hideModal()}
          >
            No, Cancel it
          </button>

          <button
            className={styles.button}
            onClick={deleteNote}
          >
            Yes, I&apos;m sure
          </button>
        </div>
      </div>
    </Modal>
  );
}
