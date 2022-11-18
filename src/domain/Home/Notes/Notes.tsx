"use client";

import Note from "./Note";
import EditNoteForm from "./EditNoteForm";
import DeleteNote from "./DeleteNote";
import ShowNoteModal from "./ShowNoteModal";

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
  const showNoteModal = useModal();

  const [editingNote, setEditingNote] = useState<NoteType>();
  const [deletingNote, setDeletingNote] = useState<NoteType>();
  const [showedNote, setShowedNote] = useState<NoteType>();

  const editNote = (note: NoteType) => {
    setEditingNote(note);
    editModal.showModal();
  };

  const deleteNote = (note: NoteType) => {
    setDeletingNote(note);
    deleteModal.showModal();
  };

  const showNote = (note: NoteType) => {
    setShowedNote(note);
    showNoteModal.showModal();
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

      <ShowNoteModal showedNote={showedNote} modal={showNoteModal}/>

      <div className={styles.notes}>
        {notes.map((note, index) => {
          return (
            <Note
              editNote={editNote}
              deleteNote={deleteNote}
              showNote={showNote}
              note={note}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
}
