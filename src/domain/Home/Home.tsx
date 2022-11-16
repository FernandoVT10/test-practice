"use client";

import CreateNoteForm from "./CreateNoteForm";
import Notes, { NotesProps } from "./Notes";

import styles from "./Home.module.scss";

interface HomeProps extends NotesProps {}

export default function Home({ notes }: HomeProps) {
  return (
    <main className={styles.home}>
      <CreateNoteForm/>

      <section className={styles.notes}>
        <Notes notes={notes}/>
      </section>
    </main>
  );
}
