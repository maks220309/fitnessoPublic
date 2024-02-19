import styles from "../styles/Account.module.css";

function Account() {
  return (
    <>
      <div className={styles.accountContainer}>
        <div className={styles.blockAccount}>
          <span>Account</span>
        </div>
        <div className={styles.accountList}>
          <div className={styles.blockWithAva}>
            <img className={styles.ava} src="https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg"></img>
            <span>Amelia Watson</span>
          </div>
          <div className={styles.buttons}>
            <div className={styles.changeAva}>Change Avatar</div>
            <div className={styles.changeNick}>Change Nickname</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
