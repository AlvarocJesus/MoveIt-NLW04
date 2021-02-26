import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';

interface Challenge{
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData{
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void,
  StartNewChallenge: () => void,
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengerProviderProps{
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengerProviderProps){
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function StartNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play;

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio emoji de festa', {
        body: `Valendo ${challenge.amount}xp!`
      });
    }
  }

  function levelUp(){
    setLevel(level + 1);
  }

  function resetChallenge(){
    setActiveChallenge(null)
  }

  function completeChallenge(){
    if(!activeChallenge){
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return(
    <ChallengesContext.Provider 
    value={{
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        StartNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge
      }}
    >
      { children }
    </ChallengesContext.Provider>
  );

}