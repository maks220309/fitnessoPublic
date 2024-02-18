import styles from "../styles/Chat.module.css";
import LeftPart from "./LeftPart";
import { SiTelegram } from "react-icons/si";

function Message({ type }) {
  return (
    <>
      <div className={box}></div>
    </>
  );
}

function Chat() {
  return (
    <>
    
        <div className={styles.calendarContainer}>
          <div className={styles.blockCalendar}>
            <span>Chat</span>
          </div>
          <div className={styles.chat}></div>
          <div className={styles.inputChat}>
            <input type="text" />
            <div className={styles.submit} >
              <SiTelegram />
            </div>
          </div>
        </div>
    
    </>
  );
}

export default Chat;
