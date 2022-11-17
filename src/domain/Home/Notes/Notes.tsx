"use client";

import Note from "./Note";
import EditNoteForm from "./EditNoteForm";
import DeleteNote from "./DeleteNote";

import { Note as NoteType } from "@services/noteService";

import { useState } from "react";
import { useModal } from "@components/Modal";

import styles from "./Notes.module.scss";

export interface NotesProps {
  notes: NoteType[]
}

export default function Notes({ notes }: NotesProps) {
  const editModal = useModal();
  const deleteModal = useModal();

  const [editingNote, setEditingNote] = useState<NoteType>();
  const [deletingNote, setDeletingNote] = useState<NoteType>();

  const editNote = (note: NoteType) => {
    setEditingNote(note);
    editModal.showModal();
  };

  const deleteNote = (note: NoteType) => {
    setDeletingNote(note);
    deleteModal.showModal();
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

      <DeleteNote deleteModal={deleteModal} deletingNote={deletingNote} />


      <div className={styles.notes}>
        {notes.map((note, index) => {
          return (
            <Note
              editNote={editNote}
              deleteNote={deleteNote}
              note={note}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
}
