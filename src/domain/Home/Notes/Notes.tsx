"use client";

import styles from "./Notes.module.scss";

import { Note as NoteType } from "@services/noteService";

export interface NotesProps {
  notes: NoteType[]
}

function Note({ note }: { note: NoteType }) {
  return (
    <div className={styles.note}>
      <h3 className={styles.title}>
        { note.title }
      </h3>

      <p className={styles.content}>
        { note.content }
      </p>
    </div>
  );
}

export default function Notes({ notes }: NotesProps) {
  if(!notes.length) {
    return (
      <div className={styles.noNotesContainer}>
        <p className={styles.message}>
          You have no notes.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.notes}>
      {notes.map(note => {
        return <Note note={note}/>;
      })}
    </div>
  );
}
