import GameModeButton from "./GameModeButton/gameModeButton.tsx";
import styles from './gameSelector.module.css'
import NavigationBar from "../NavigationBar/navigationBar.tsx";

const GameSelector = () => {
    //const [hoveredMode, setHoveredMode] = React.useState(null);

    const gameModes = [
        {name: "Блиц", image: "src/assets/stopwatch.svg", href: "/game/blitz"},
        {name: "Спринт", image: "src/assets/location.svg", href: "#"},
        {name: "Марафон", image: "src/assets/star.svg", href: "#"},
        {name: "Турнир", image: "src/assets/trophy.svg", href: "#"}
    ]

    return (
        <div className={styles.externalContainer}>
            <NavigationBar></NavigationBar>
            <div className={styles.container}>
                <p className={styles.title}>Выберите Режим</p>
                <div className={styles.buttonContainer}>
                    {gameModes.map((mode, index) => (
                        <GameModeButton
                            image={mode.image}
                            name={mode.name}
                            href={mode.href}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameSelector;