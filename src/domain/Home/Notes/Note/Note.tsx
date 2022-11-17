"use client";

import { KebabHorizontalIcon, TrashIcon, PencilIcon } from "@primer/octicons-react";

import { Note as NoteType } from "@services/noteService";

import { useState } from "react";

import styles from "./Note.module.scss";

interface DropDownProps {
  onClickDelete: () => void,
  onClickEdit: () => void
}

function DropDown({ onClickDelete, onClickEdit }: DropDownProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (cb: () => void) => () => {
    setIsActive(false);
    cb();
  };

  const dropdownClass = isActive ? styles.active : "";

  return (
    <div className={`${styles.dropdown} ${dropdownClass}`}>
      <button
        className={styles.toggleButton}
        onClick={handleClick(() => setIsActive(!isActive))}
      >
        <KebabHorizontalIcon size={16}/>
      </button>

      <div className={styles.menu}>
        <button
          className={styles.item}
          onClick={handleClick(onClickDelete)}
        >
          <TrashIcon size={16} className={styles.icon}/>
          Delete Note
        </button>

        <button
          className={styles.item}
          onClick={handleClick(onClickEdit)}
        >
          <PencilIcon size={16} className={styles.icon}/>
          Edit Note
        </button>
      </div>

      <div
        className={styles.bg}
        onClick={() => setIsActive(false)}
      ></div>
    </div>
  );
}

interface NoteProps {
  note: NoteType,
  editNote: (note: NoteType) => void,
  deleteNote: (note: NoteType) => void
}

export default function Note({ note, editNote, deleteNote }: NoteProps) {
  return (
    <div className={styles.note}>
      <div className={styles.head}>
        <h3 className={styles.title}>
          { note.title }
        </h3>

        <DropDown
          onClickDelete={() => deleteNote(note)}
          onClickEdit={() => editNote(note)}
        />
      </div>

      <p className={styles.content}>
        { note.content }
      </p>
    </div>
  );
}
