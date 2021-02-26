import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData{
  minutos: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountDown: () => void;
  resetCountDown: () => void;
}

interface CountdownProviderProps{
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countDownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps){
  const { StartNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsactive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutos = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountDown(){
    setIsactive(true);
  }

  function resetCountDown(){
    clearTimeout(countDownTimeout);
    setIsactive(false);
    setTime(25*60);
    setHasFinished(false)
  }

  useEffect(() => {
    if(isActive && time > 0){
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if(isActive && time === 0){
      setHasFinished(true);
      setIsactive(false);
      StartNewChallenge();
    }
  }, [isActive, time])

  return(
    <CountdownContext.Provider value={{
      minutos,
      seconds,
      hasFinished,
      isActive,
      startCountDown,
      resetCountDown
    }}>
      {children}
    </CountdownContext.Provider>
  );
}