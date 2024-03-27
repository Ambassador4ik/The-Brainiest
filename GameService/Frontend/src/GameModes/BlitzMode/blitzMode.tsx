import BlitzModeOptions from "./BlitzModeOptions/blitzModeOptions.tsx";
import styles from './blitzMode.module.css'
import NavigationBar from "../../NavigationBar/navigationBar.tsx";

const blitzMode = () => {
    return (
        <div className={styles.container}>
            <div className={styles.navBarContainer}>
                <NavigationBar></NavigationBar>
            </div>
            <div className={styles.gameContainer}>
                <BlitzModeOptions></BlitzModeOptions>
                <div className={styles.separator}></div>
                <BlitzModeOptions></BlitzModeOptions>
                <div className={styles.separator}></div>
                <BlitzModeOptions></BlitzModeOptions>
            </div>
        </div>
    )
}
export default blitzMode;