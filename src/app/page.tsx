import Nav from "@/components/Nav/Nav";
import styles from "./page.module.css";
import { Search } from "@/components/Search/Search";

export default function Home() {
  return (
    <div>
      <main>
        <Nav />

        <Search />
      </main>
      <footer className={styles.footer}>TODO</footer>
    </div>
  );
}
