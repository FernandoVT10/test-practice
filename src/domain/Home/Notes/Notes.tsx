"use client";

import styles from "./Notes.module.scss";

import { Note } from "@services/noteService";

export interface NotesProps {
  notes: Note[]
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
    <h2>notes</h2>
  );
}
