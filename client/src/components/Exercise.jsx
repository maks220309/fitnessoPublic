import { useEffect, useState } from "react";
import styles from "../styles/Exercise.module.css";
import MyClock from "./Clock";
import { api } from "../api/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
function Exercise() {
    const { id } = useParams();
    const [exerciseData, setExerciseData] = useState(null);
    const [currentInterval, setCurrentInterval] = useState("work"); // 'work' or 'chill'
    const [timer, setTimer] = useState(0);
    const [repetitions, setRepetitions] = useState(0);
    const [isActive, setIsActive] = useState(false); // To control the timer
	const navigator = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get("/task/" + id);
                setExerciseData(response.data);
                setTimer(response.data.timeExercise);
                setRepetitions(response.data.quantity);
            } catch (error) {
                console.error("Error fetching exercise data:", error);
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        let intervalId;
        if (isActive && repetitions > 0 && timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        if (currentInterval === "work") {
                            setCurrentInterval("chill");
                            return exerciseData.timeChill;
                        } else {
                            setCurrentInterval("work");
                            setRepetitions((prevReps) => {
                                const newReps = prevReps - 1;
                                if (newReps === 0) {
                                    setIsActive(false);
                                }
                                return newReps;
                            });
                            return exerciseData.timeExercise;
                        }
                    }
                });
            }, 1000);
        }if(repetitions > 0 && isActive && timer === 0){
			setRepetitions(repetitions-1);
			setTimer(exerciseData.timeExercise);
		}else if(repetitions === 0 && timer === 0 && isActive){
			navigator(`/app/exercises`);
		}

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isActive, repetitions, currentInterval, timer, exerciseData]);

    const toggleActiveState = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <div className={styles.calendarContainer}>
                <div className={styles.blockCalendar}>
                    <span>{exerciseData?.title}</span>
                </div>
                {exerciseData && (
                    <MyClock
                        time={timer}
                        mode={currentInterval}
                        repetitions={repetitions}
                    />
                )}
                <div
                    className={styles.chchchc}
                    onClick={toggleActiveState}
                    style={
                        currentInterval === "chill"
                            ? { background: "#4971ff" }
                            : { background: "#e8984e" }
                    }
                >
                    {isActive ? "Pause" : "Start"}
                </div>
                <p style={{ fontSize: "23px", color: "gray", fontWeight: 500 }}>
                    Mode: {currentInterval}
                </p>
                <p style={{ fontSize: "23px", color: "gray", fontWeight: 500 }}>
                    Repetitions Left: {repetitions}
                </p>
            </div>
        </>
    );
}

export default Exercise;
