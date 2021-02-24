import { CompliteChallenges } from "../components/CompliteChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | MoveIt</title>
      </Head>

      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompliteChallenges />
          <CountDown />
        </div>
        <div>

        </div>
      </section>
    </div>
  )
}