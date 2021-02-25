import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
  const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

  return(
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} XP</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Body"/>
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>

            <footer>
              <button
                type="button"
                className={styles.challengesFailedButton}
                onClick={resetChallenge}
              >
                Falhei
              </button>

              <button
                type="button"
                className={styles.challengesSuccededButton}
                onClick={}
              >
                Completei
              </button>
            </footer>
          </main>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
        <strong>Finalize um ciclo para receber um desafio</strong>

        <p>
          <img src="icons/level-up.svg" alt="Level UP"/>
          Avançe de level completando desafios.
        </p>
      </div>
      )}
    </div>
  );
}