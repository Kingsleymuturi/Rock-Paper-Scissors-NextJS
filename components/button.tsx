import '../styles/Button.module.css';

interface ButtonProps{
    beginPlay?: (choice: 'rock' | 'paper' | 'scissors') => void;
    choice: 'rock' | 'paper' | 'scissors';
    result?: boolean;
    disable: boolean;
}

export function Button({beginPlay, choice, result, disable} : ButtonProps){
    return(
        <div className="buttonContainer">
            <button disabled = {disable} type="button"
                className={
                    choice === 'rock'? "rock":
                    choice === 'paper'? "paper":
                    "scissors"
                }
                onClick={() => beginPlay(choice)}>
                <img src={`/icon-${choice}.svg`}/>
            </button>
            {result && <span/>}
        </div>
    )
}