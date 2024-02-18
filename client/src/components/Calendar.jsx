import { useContext } from "react";
import styles from "../styles/Calendar.module.css";
import LeftPart from "./LeftPart";
import UserContext from "../context/UserContext";
function Calendar() {
	const user = useContext(UserContext);
	function updateDaysWithTasks(days, tasks) {
		const updatedDays = days.map((day) => [...day]);

		tasks.forEach((task) => {
			const dayToUpdate = updatedDays.find((day) => day[0] === task.date);
			if (dayToUpdate) {
				dayToUpdate[1] = true;
			}
		});

		return updatedDays;
	}
	let days = [
		[1, false],
		[2, false],
		[3, false],
		[4, false],
		[5, false],
		[6, false],
		[7, false],
		[8, false],
		[9, false],
		[10, false],
		[11, false],
		[12, false],
		[13, false],
		[14, false],
		[15, false],
		[16, false],
		[17, false],
		[18, false],
		[19, false],
		[20, false],
		[21, false],
		[22, false],
		[23, false],
		[24, false],
		[25, false],
		[26, false],
		[27, false],
		[28, false],
		[29, false],
	];

	console.log(user);
	const tasks = user.data.calendar;
	const arr = updateDaysWithTasks(days, tasks);

	let done = user.data.calendar.length;

	return (
		<div className={styles.calendarContainer}>
			<div className={styles.blockCalendar}>
				<span>Calendar</span>
			</div>
			<div className={styles.calendarTochechki}>
				{arr.map((el) => {
					return (
						<div
							className={styles.day}
							style={el[1] ? { background: "#97FF73" } : {}}
						>
							<span style={el[1] ? { color: "#111" } : {}}>{el[0]}</span>
						</div>
					);
				})}
			</div>
			<div className={styles.info}>
				<span>{`Выполнено действий: ${done}`}</span>
			</div>
		</div>
	);
}

export default Calendar;
