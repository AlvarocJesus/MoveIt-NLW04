import { createContext, useState, ReactNode } from 'react';
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

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function StartNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function levelUp(){
    setLevel(level + 1);
  }

  function resetChallenge(){
    setActiveChallenge(null)
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
        experienceToNextLevel
      }}
    >
      { children }
    </ChallengesContext.Provider>
  );

}