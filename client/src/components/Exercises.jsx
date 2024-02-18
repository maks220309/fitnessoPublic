import { useContext, useEffect, useState } from "react";
import styles from "../styles/Exercises.module.css";
import LeftPart from "./LeftPart";
import { api } from "../api/api";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router";
function Exercises() {
	const user = useContext(UserContext);
	const [click, setClick] = useState(0);
	const [ready, setReady] = useState(true);
	const [arr, setArr] = useState(user.data.tasks);
	const navigator = useNavigate();

	useEffect(() => {
		if (click == 0) return;
		async function fetchData() {
			if (ready) {
				setReady(false);
				try {
					const { data } = await api.get("/tasksGen");
					console.log(data);
					setArr(data);
				} finally {
					setReady(true);
				}
			}
		}
		fetchData();
	}, [click]);

	let func = (id) => {
		navigator("/app/exercise/" + id);
		// alert(`clicked on exercise with id: ${id}`);
	};
	return (
		<div className={styles.exercisesContainer}>
			<div className={styles.blockExercises}>
				<span>Exercises</span>
			</div>
			<div className={styles.exercisesList}>
				{arr.map((el) => {
					return (
						<div
							className={styles.exercise}
							id={el.id}
							key={el.id}
							onClick={() => {
								func(el.id);
							}}
						>
							<div className={styles.block}>{el.description}</div>
							<div className={styles.info}>
								<span>{el.title}</span>
								{el.completed ? (
									<div className={styles.circleDone}></div>
								) : (
									<div className={styles.circleNotDone}></div>
								)}
							</div>
						</div>
					);
				})}
			</div>
			<div
				className={styles.generate}
				onClick={() => {
					setClick(click + 1);
				}}
			>
				<span>{!ready ? "Generating..." : "Generate exercises"}</span>
			</div>
		</div>
	);
}

export default Exercises;
