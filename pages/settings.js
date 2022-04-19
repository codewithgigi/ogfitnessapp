import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Section from "../components/Section";
export default function Settings() {
  const router = useRouter();
  return (
    <Section>
      <h1 className={styles.title}>Settings</h1>
    </Section>
  );
}
