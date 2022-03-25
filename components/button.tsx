import styles from '../styles/Home.module.css';

interface ButtonProps{
    beginPlay?: (choice: 'rock' | 'paper' | 'scissors') => void;
    choice: 'rock' | 'paper' | 'scissors';
    result?: boolean;
    disable: boolean;
}

export function Button({beginPlay, choice, result, disable} : ButtonProps){
    return(
        <div className={styles.buttonContainer}>
            <button disabled = {disable} type="button"
                className={
                    choice === 'rock'? styles.rock:
                    choice === 'paper'? styles.paper:
                    styles.scissors
                }
                onClick={() => beginPlay(choice)}>
                <img src={`/icon-${choice}.svg`}/>
            </button>
            {result && <span/>}
        </div>
    )
}