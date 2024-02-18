import styles from "../styles/Timer.module.css";
import Clock from "./Clock";
function Chat() {
	return (
		<>
			<div className={styles.calendarContainer}>
				<div className={styles.blockCalendar}>
					<Clock />
					<span>Timer</span>
				</div>
			</div>
		</>
	);
}

export default Chat;
