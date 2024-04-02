import styles from './gameModeButton.module.css'
import React from "react";

interface GameModeButtonProps {
  image: string;
  name: string;
  href: string;
}

const GameModeButton: React.FC<GameModeButtonProps> = ({image, name, href}) => {
  return (
    <a
      className={styles.gameModeButton}
      href={href}
    >
      <img className={styles.gameModeButtonImage} src={image} alt={name}/>
    </a>
  );
};

export default GameModeButton