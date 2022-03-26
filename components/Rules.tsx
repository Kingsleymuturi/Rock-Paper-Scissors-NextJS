import styles from '../styles/Rules.module.css';

interface ModalProps{
    toggleModal: () => void;
    showModal:boolean;
}

export function RulesModal({toggleModal, showModal}: ModalProps){
  
    return(
        <div className={styles.modalContainer}
            style={showModal ? {visibility:"visible"} : {visibility:"hidden"} }>
            <div className={`${styles.rulesContainer} ${showModal ? styles.modalAnimationShowUp : styles.modalAnimationClose}`}>
                <p>RULES
                    <button type="button" onClick={toggleModal}>
                        <img src="/icon-close.svg" alt="Close"/>
                    </button>
                </p>
                <span>
                    <img src="/image-rules.svg" alt="Rules"/>
                </span>

            </div>
       </div>
    )
}