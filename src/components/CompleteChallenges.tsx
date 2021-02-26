import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompliteChallenges.module.css';

export function CompleteChallenges(){
  const { challengesCompleted } = useContext(ChallengesContext);

  return(
    <div className={styles.complitedChallenges}>
      <span>Desafios Completos: </span>
      <span>{challengesCompleted}</span>
    </div>
  );
}