import logo from "./assets/logo.png";
import connections from "./assets/aiFunctions.png";
import microchip from "./assets/microchip.png";
import styles from "./App.module.css";
import { useNavigate } from "react-router-dom";
import { IoFootstepsSharp } from "react-icons/io5";
const App = () => {
  const navigator = useNavigate();
  return (
    <div className={styles.App}>
      <section className={styles["welcoming-page"]}>
        <nav className={styles["welcoming-page__navbar"]}>
          <div className={styles["welcoming-page__navbar__description"]}>
            <IoFootstepsSharp className={styles.logo} />
            <h3 className={styles["welcoming-page__navbar__name"]}>Fitnesso</h3>
          </div>
          <div
            className={styles["welcoming-page__navbar__functions-container"]}
          >
            <div
              className={
                styles[
                  "welcoming-page__navbar__functions-container__messenger-main-function"
                ]
              }
            ></div>
          </div>
          <div className={styles["welcoming-page__navbar__sign-in-container"]}>
            <div
              className={
                styles["welcoming-page__navbar__sign-in-container__btns"]
              }
            >
              <span
                onClick={() => {
                  navigator("/login");
                }}
                className={
                  styles[
                    "welcoming-page__navbar__sign-in-container__btns__login"
                  ]
                }
              >
                Login
              </span>
              <span
                onClick={() => {
                  navigator("/registration");
                }}
                className={
                  styles[
                    "welcoming-page__navbar__sign-in-container__btns__sign-in"
                  ]
                }
              >
                Sign in
              </span>
            </div>
          </div>
        </nav>
        <section className={styles["welcoming-page__main-info"]}>
          <div className={styles["welcoming-page__main-info__top-part"]}>
            <h1
              className={
                styles["welcoming-page__main-info__top-part__welcome-msg"]
              }
            >
              Welcome to our
              <span
                className={
                  styles[
                    "welcoming-page__main-info__top-part__welcome-msg__main-part"
                  ]
                }
              >
                fitness app
              </span>
            </h1>
            <h5
              className={
                styles["welcoming-page__main-info__top-part__lil-description"]
              }
            >
              Fitnesso is a fitness app that helps you to stay fit and healthy.
            </h5>
            <div
              className={
                styles["welcoming-page__main-info__top-part__start-chat"]
              }
            >
              <div
                className={
                  styles[
                    "welcoming-page__main-info__top-part__start-chat__border-style"
                  ]
                }
                onClick={() => {
                  navigator("/registration");
                }}
              >
                Get started
              </div>
            </div>
          </div>
          <div className={styles["welcoming-page__main-info__bottom-part"]}>
            <div
              className={
                styles[
                  "welcoming-page__main-info__bottom-part__description-container"
                ]
              }
            >
              <h6
                className={
                  styles[
                    "welcoming-page__main-info__bottom-part__description-container__full-description"
                  ]
                }
              >
                Our app helps you to track your progress and to stay fit and
                healthy. You will be given 6 tasks to complete every day. And if
                it is not enough, you can generate some exercises with out chat
                bot. You can also track your progress in the calendar.
              </h6>
            </div>
            <div
              className={
                styles["welcoming-page__main-info__bottom-part__img-container"]
              }
            >
              <span className={styles.info}>
                Built with React, Vue, Bard Api and Node.js
              </span>
            </div>
          </div>
        </section>
      </section>
      <img className={styles.microchip} src={microchip} alt="" />
    </div>
  );
};

export default App;
