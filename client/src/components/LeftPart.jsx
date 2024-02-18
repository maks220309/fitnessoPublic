import styles from "../styles/LeftPart.module.css";
import { IoFootstepsSharp } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";
import { FaDumbbell } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { useNavigate } from "react-router";
import { NavLink, Outlet } from "react-router-dom";
import cn from "classnames";
import UserContext from "../context/UserContext";
import { useContext } from "react";
function LeftPart() {
	const user = useContext(UserContext);
	console.log(user);

	return (
		<div className={styles.leftPartContainer}>
			<div className={styles.logoAndName}>
				<IoFootstepsSharp className={styles.logo} />
				<span className={styles.name}>Fitnesso</span>
			</div>
			<div className={styles.avaAndName}>
				<img
					className={styles.ava}
					src={user.data.avatar}
					styles={{ width: "50px" }}
				></img>
				<span className={styles.nameUser}>{user.data.username}</span>
			</div>
			<div className={styles.routes}>
				{/* <NavLink to='/categories' className={({ isActive }) => cn(styles['link'], { [styles.active]: isActive })}>
						Categories
				</NavLink> */}
				<NavLink
					to='/app/calendar'
					className={({ isActive }) =>
						cn(styles["calendarContainer"], { [styles.active]: isActive })
					}
				>
					<FaCalendarDays className={styles.icon} />
					<span>Calendar</span>
				</NavLink>
				<NavLink
					to='/app/exercises'
					className={({ isActive }) =>
						cn(styles["exercisesContainer"], { [styles.active]: isActive })
					}
				>
					<FaDumbbell className={styles.icon} />
					<span>Exercises</span>
				</NavLink>
				<NavLink
					to='/app/aiassistant'
					className={({ isActive }) =>
						cn(styles["AIAssistantContainer"], { [styles.active]: isActive })
					}
				>
					<FaRobot className={styles.icon} />
					<span>AI Assistant</span>
				</NavLink>
				<NavLink
					to='/app/chat'
					className={({ isActive }) =>
						cn(styles["AIAssistantContainer"], { [styles.active]: isActive })
					}
				>
					<FaRobot className={styles.icon} />
					<span>Chat</span>
				</NavLink>
				<NavLink
					to='/app/account'
					className={({ isActive }) =>
						cn(styles["accountContainer"], { [styles.active]: isActive })
					}
				>
					<MdManageAccounts className={styles.icon} />
					<span>Account</span>
				</NavLink>
			</div>
		</div>
	);
}

export default LeftPart;
