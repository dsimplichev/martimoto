import Nav from "@/components/Nav/Nav";
import styles from "./page.module.css";
import { Search } from "@/components/Search/Search";
import { getHomePage } from "@/lib/getData";

export default async function Home() {
  const page = await getHomePage();
  const links =
    page?.fields?.links?.map(
      (link: { sys: { id: string }; fields: { displayName: string } }) => {
        return {
          id: link?.sys?.id,
          text: link?.fields?.displayName,
        };
      }
    ) || [];

  return (
    <div>
      <main>
        <Nav links={links} bannerText={page?.fields?.bannerText} />

        <Search />
      </main>
      <footer className={styles.footer}>TODO</footer>
    </div>
  );
}
