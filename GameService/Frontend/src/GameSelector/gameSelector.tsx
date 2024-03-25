import GameModeButton from "./GameModeButton/gameModeButton.tsx";
import styles from './gameSelector.module.css'

const GameSelector = () => {
    //const [hoveredMode, setHoveredMode] = React.useState(null);

    const gameModes = [
        {name: "Блиц", image: "src/assets/stopwatch.svg"},
        {name: "Спринт", image: "src/assets/location.svg"},
        {name: "Марафон", image: "src/assets/star.svg"},
        {name: "Турнир", image: "src/assets/trophy.svg"}
    ]

    return (
        <div className={styles.container}>
            <p className={styles.title}>Выберите Режим</p>
            <div className={styles.buttonContainer}>
                {gameModes.map((mode, index) => (
                    <GameModeButton
                        image={mode.image}
                        name={mode.name}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default GameSelector;