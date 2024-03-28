import BlitzModeOptions from "./BlitzModeOptions/blitzModeOptions.tsx";
import styles from './blitzMode.module.css'
import NavigationBar from "../../NavigationBar/navigationBar.tsx";
import BlitzModeRules from "./BlitzModeRules/blitzModeRules.tsx";

const blitzMode = () => {
    return (
        <div className={styles.container}>
            <div className={styles.navBarContainer}>
                <NavigationBar></NavigationBar>
            </div>
            <div className={styles.gameContainer}>
                <div className={styles.gameComponent}>
                    <BlitzModeOptions />
                </div>
                <div className={styles.separator}></div>
                <div className={styles.gameComponent}>

                </div>
                <div className={styles.separator}></div>
                <div className={styles.gameComponent}>
                    <BlitzModeRules />
                </div>
            </div>
        </div>
    )
}
export default blitzMode;