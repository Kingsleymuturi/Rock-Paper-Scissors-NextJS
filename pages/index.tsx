import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import styles from '../styles/Index.module.css';
import { Button } from '../components/button';

interface HomeProps{
  scoreCookie: number;
}

export default function Home({scoreCookie}: HomeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerChoice,setPlayerChoice] = useState<'rock' | 'paper' | 'scissors'>();
  const [computerChoice, setComputerChoice] = useState<'rock' | 'paper' | 'scissors' | null>(null);
  const possibleResults = ['rock', 'paper', 'scissors'];
  const [result, setResult] = useState<'YOU WIN' | 'YOU LOSE' | 'DRAW'>();
  const [score, setScore] = useState(scoreCookie ?? 0);
  const [isFinished, setIsFinished] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  function matchResults(){
    switch (playerChoice) {
      case "rock":
          if(computerChoice === "scissors"){
            setResult('YOU WIN')
            setScore(score + 1)
          }else if(computerChoice === "paper"){
            setResult('YOU LOSE')
            setScore(score - 1)
          }else{
            setResult('DRAW')
          }
        break;
      case "paper":
          if(computerChoice === "rock"){
            setResult('YOU WIN')
            setScore(score + 1)
          }else if(computerChoice === "scissors"){
            setResult('YOU LOSE')
            setScore(score - 1)
          }else{
            setResult('DRAW')
          }
        break;
      case "scissors":
          if(computerChoice === "paper"){
            setResult('YOU WIN')
            setScore(score + 1)
          }else if(computerChoice === "rock"){
            setResult('YOU LOSE')
            setScore(score - 1)
          }else{
            setResult('DRAW')
          }
        break;
    
      default:
        break;
    }
    setIsFinished(true)
  }

  function reMatch(){
    setIsPlaying(false);
    setComputerChoice(null);
    setIsFinished(false);
    setResult("DRAW");
  }

  useEffect(()=>{
    if(computerChoice){
      setTimeout(()=>{
        matchResults()
      },1000)
    }
  },[computerChoice])

  useEffect(() =>{
    Cookies.set(`scoreCookie`, String(score));
  },[score])

  function toggleModal(){
    setShowModal(!showModal);
  }


  return (
    <div className={styles.container}>
          <header>
              <img src="/logo.svg" alt="Rock Paper Scissors"/>

              <div className={styles.scoreContainer}>
                <p>SCORE</p>
                <span>{score}</span>
              </div>
          </header>

          <main className={styles.main}>
            {!isPlaying ?
              <div className={styles.pickContainer}>
                <Button disable={isPlaying} beginPlay={beginPlay} choice="paper"/>
                <Button disable={isPlaying} beginPlay={beginPlay} choice="scissors"/>
                <Button disable={isPlaying} beginPlay={beginPlay} choice="rock"/>
              </div>
              :
              <div className={styles.gamingWrapper}>
                <div className={styles.gamingContainer}>
                  <div className={styles.playerChoiceContainer}>
                      <Button 
                        disable={isPlaying} 
                        choice={playerChoice}
                        result={result === 'YOU WIN'}
                      />
                    <p>YOU PICKED</p>
                  </div>

                  {isFinished &&
                  <div className={styles.resultContainer}>
                        <p>{result}</p>
                        <button type="button" onClick={reMatch}>
                          PLAY AGAIN
                        </button>
                  </div>
                  }

                  <div className={styles.computerChoiceContainer}>
                      {!computerChoice ? <span/>
                      :
                      <Button 
                        disable={isPlaying} 
                        choice={computerChoice}
                        result={result === 'YOU LOSE'}
                      />
                      }
                      <p>THE HOUSE PICKED</p>
                  </div>
                </div>

                
              </div>
              
            }
          </main>
    </div>
  )
}

export const getServerSideProps : GetServerSideProps = async (ctx) =>{
  const{scoreCookie} = ctx.req.cookies;

  return{
    props:{
      scoreCookie: Number (scoreCookie),
    }
  }
}