import styles from './gameModeButton.module.css'
import React from "react";

interface GameModeButtonProps {
  image: string;
  name: string;
}

const GameModeButton: React.FC<GameModeButtonProps> = ({image, name}) => {
  return (
    <div
      className={styles.gameModeButton}
    >
      <img className={styles.gameModeButtonImage} src={image} alt={name}/>
    </div>
  );
};

export default GameModeButton