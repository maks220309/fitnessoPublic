import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles/Calendar.module.css";
import LeftPanel from "./components/LeftPart";
import { api } from "./api/api";
import UserContext from "./context/UserContext";

const Layout = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			const userData = await api.get("/@me");
			setUser(userData);
		};

		fetchUser();
	}, []);

	return (
		<div className={styles.mainContainer}>
			<UserContext.Provider value={user}>
				{user ? (
					<>
						<LeftPanel />
						<Outlet />
					</>
				) : null}
			</UserContext.Provider>
		</div>
	);
};

export default Layout;
