import {createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

import challenges from "../../challenges.json"
import  LevelUpModal  from "../components/LevelUpModal";


interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengeCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge:() => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void; 
}

interface ChallengesProviderProps {
  children:  ReactNode;
  level: number;
  currentExperience: number;
  challengeCompleted: number
}




export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({
  children,
  ...rest
  }: ChallengesProviderProps) {

   const [level, setLevel] = useState(rest.level ?? 1);
   const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
   const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);

   const [activeChallenge, setActiveChallenge] = useState(null);

   const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)  // ativar e desativar modal

   const experienceToNextLevel = Math.pow((level + 1) * 4, 2); // Calculo para determinar o nível
   
   useEffect(()=>{
     Notification.requestPermission();
   }, []) 

   useEffect(()=> {
      Cookies.set("level", String(level))
      Cookies.set("currentExperience", String(currentExperience))
      Cookies.set("challengeCompleted", String(challengeCompleted))
   }, [level, currentExperience, challengeCompleted])

   function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
   }

   function closeLevelUpModal() {
     setIsLevelUpModalOpen(false);
   }
   function startNewChallenge() { // inicia o desafio
     const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
     const challenge = challenges[randomChallengeIndex];

     setActiveChallenge(challenge)

    new Audio("/notification.mp3").play()
     if(Notification.permission === "granted") {
       new Notification("Novo desafio 🎉", {
         body: `Valendo ${challenge.amount}xp!`
       })
     }
}

   function resetChallenge() {  // Falhei no desafio como falhado
     setActiveChallenge(null)
   }

   function completeChallenge() { // Desafio concluído
       
      if(!activeChallenge) {
        return;
      }

      const { amount } = activeChallenge;

      let finalExperience = currentExperience + amount;

      if (finalExperience >= experienceToNextLevel) {
          finalExperience = finalExperience - experienceToNextLevel   
          levelUp();
      }

      setCurrentExperience(finalExperience);   // Nível 
      setActiveChallenge(null);  // voltando os desfios para nullo
      setChallengeCompleted(challengeCompleted + 1) // adicionando desafio como completo
      
   }

   return (
    <ChallengesContext.Provider 
    value={{
      level, 
      currentExperience,
      challengeCompleted,
      experienceToNextLevel,
      levelUp,
      startNewChallenge, 
      activeChallenge,  
      resetChallenge,
      completeChallenge,
      closeLevelUpModal,
      }}
      >
     {children}
     {isLevelUpModalOpen &&  <LevelUpModal />}
    </ChallengesContext.Provider>
   )
}