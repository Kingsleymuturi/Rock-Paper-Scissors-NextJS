import { useState } from 'react'

export default function Home() {
  const [setIsPlaying] = useState(false);
  const [setPlayerChoice] = useState<'rock' | 'paper' | 'scissors'>();
  const [setComputerChoice] = useState<'rock' | 'paper' | 'scissors' | null>(null);
  const possibleResults = ['rock', 'paper', 'scissors'];

  function beginPlay(choice: 'rock' | 'paper' | 'scissors'){
      setIsPlaying(true);

      setPlayerChoice(choice);

      setTimeout(() =>{
        const randomResult = Math.floor(Math.random() * possibleResults.length);

        if (possibleResults[randomResult] === 'rock'){
          setComputerChoice("rock");
        }else if(possibleResults[randomResult] === 'paper'){
          setComputerChoice("paper")
        }else{
          setComputerChoice("scissors")
        }
      },1000)
  }
}