import React, { useEffect, useState } from "react";
import styles from "../styles/Clock.module.css";

function MyClock({ time, mode }) {
	return (
		<div
			className={styles.clock}
			style={
				mode == "chill"
					? { border: "11px solid #4971ff" }
					: { border: "11px solid #e8984e" }
			}
		>
			<p>{time}</p>
		</div>
	);
}

export default MyClock;
