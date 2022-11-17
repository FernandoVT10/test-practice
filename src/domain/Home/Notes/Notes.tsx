"use client";

import Note from "./Note";
import EditNoteForm from "./EditNoteForm";

import { Note as NoteType } from "@services/noteService";

import { useState } from "react";
import { useModal } from "@components/Modal";

import styles from "./Notes.module.scss";

export interface NotesProps {
  notes: NoteType[]
}

export default function Notes({ notes }: NotesProps) {
  const editModal = useModal();
  const [editingNote, setEditingNote] = useState<NoteType>();

  const editNote = (note: NoteType) => {
    setEditingNote(note);
    editModal.showModal();
  };

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
    <>
      <EditNoteForm
        editModal={editModal}
        editingNote={editingNote}
      />

      <div className={styles.notes}>
        {notes.map((note, index) => {
          return <Note editNote={editNote} note={note} key={index}/>;
        })}
      </div>
    </>
  );
}
