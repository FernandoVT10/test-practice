import Modal, { UseModalReturn } from "@components/Modal";
import { Note } from "@services/noteService";

import styles from "./ShowNoteModal.module.scss";

interface ShowNoteModalProps {
  showedNote: Note | undefined,
  modal: UseModalReturn
}

export default function ShowNoteModal({
  showedNote,
  modal
}: ShowNoteModalProps) {
  return (
    <Modal
      title={showedNote?.title || "Default title"}
      modal={modal}
    >
      <div className={styles.showNote}>
        <p className={styles.content}>
          { showedNote?.content }
        </p>
      </div>
    </Modal>
  );
}
