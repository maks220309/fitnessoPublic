import { useState } from "react";

import styles from "./Auth.module.css";
import classNames from "classnames";
import { FaArrowLeft } from "react-icons/fa6";
import { IoFootstepsSharp } from "react-icons/io5";
import { FileUploader } from "react-drag-drop-files";
import { PiCheckCircleLight } from "react-icons/pi";
import { FaEnvelope } from "react-icons/fa";
import { api, API_URL } from "../../api/api";
import { useNavigate } from "react-router-dom";

function Auth({ typePAPAPAAPAGEGEGEGGE }) {
  const navigator = useNavigate();
  const [backState, setBackState] = useState("/");
  const [page, setPage] = useState(0);
  const fileTypes = ["JPG", "PNG"];
  const [base64Data] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [typePage] = useState(typePAPAPAAPAGEGEGEGGE);
  const [blocked, setBlocked] = useState(false);
  const dotClasses = classNames({
    [styles.dotBlue]: page === 1,
    [styles.dot]: page !== 1,
  });
  const [file, setFile] = useState(null);

  function arrayBufferToBase64(buffer) {
    return new Promise((resolve, reject) => {
      const blob = new Blob([buffer]);
      const reader = new FileReader();
      reader.onloadend = () => {
        // @ts-ignore
        const base64result = reader.result.split(",")[1];
        resolve(base64result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }

  const handleChange = async (file) => {
    if (file) {
      console.log(file);
      const arrayBuffer = await file.arrayBuffer();
      const base64String = await arrayBufferToBase64(arrayBuffer);
      console.log(base64String);
      if (base64Data) {
        formData.image = base64String;
        formData.is.image = true;
      }
      // @ts-ignore
      setFile(file);
    }
  };

  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    image: "",
    is: {
      email: false,
      password: false,
      confirmPassword: false,
      nickname: false,
      image: false,
    },
  };

  const [formData, setFormData] = useState(initialState);

  const changePage = () => {
    if (typePage == "registration") {
      if (
        formData.confirmPassword &&
        formData.password &&
        formData.email &&
        formData.is.image &&
        formData.is.nickname
      ) {
        // console.log('pipiska');
        const obj2 = {
          email: formData.email,
          password: formData.password,
          username: formData.nickname,
          avatar: formData.image,
        };
        if (blocked) return;
        setBlocked(true);
        console.log("send");

        api
          .post(`${API_URL}/registration`, obj2)
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.accessToken);
            setBlocked(false);
            setIsRegistered(true);
            // setTimeout(() => {
            // 	window.location.href = '/chat';
            // }, 1000);
          })
          .catch((e) => {
            console.log(e);
            setBlocked(false);
            alert(
              "Произошла непредвиденная ошибка, попробуйте снова через некоторое время." +
                e
            );
          });
      } else if (
        formData.is.confirmPassword &&
        formData.is.password &&
        formData.is.email
      ) {
        setBackState("back");
        setPage(1);
        console.log(formData);
      } else {
        console.log(formData);
      }
    } else {
      if (formData.password && formData.email) {
        // console.log('pipiska');
        const obj2 = {
          email: formData.email,
          password: formData.password,
        };
        if (blocked) return;
        setBlocked(true);
        // console.log('send login');

        api
          .post(`${API_URL}/login`, obj2)
          .then((res) => {
            // console.log(res.data);
            localStorage.setItem("token", res.data.accessToken);
            setBlocked(false);
            // setIsRegistered(true);
            setTimeout(() => {
              navigator("/app/calendar");
            }, 300);
          })
          .catch((e) => {
            console.log(e);
            setBlocked(false);
            alert(
              "Произошла непредвиденная ошибка, попробуйте снова через некоторое время." +
                e
            );
          });
      } else {
        console.log(formData);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInput = (name, value) => {
    switch (name) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "password":
        return value.length >= 8 && value.length <= 32;
      case "confirmPassword":
        return value === formData.password;
      case "nickname":
        return !!value;
      default:
        return true;
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      is: { ...formData.is, [name]: validateInput(name, value) },
    });
  };

  return (
    <>
      <div className={styles.containerMain}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.back}>
              {isRegistered ? null : (
                <div
                  className={styles.activeBack}
                  onClick={() => {
                    console.log(backState);
                    if (backState === "back") {
                      setPage(0);
                    } else {
                      navigator("/");
                    }
                  }}
                >
                  <FaArrowLeft style={{ color: "#A3A3A3" }} />
                  <p style={{ color: "#A3A3A3", marginLeft: "10px" }}>back</p>
                </div>
              )}
            </div>
            <div className={styles.wuforia}>
              <IoFootstepsSharp className={styles.logo} />
            </div>
            <div className={styles.topBlock}></div>
          </div>
          <div className={styles.inputs}>
            {typePage == "login" ? (
              <>
                <div className={styles.input}>
                  <p>Email</p>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Enter your email"
                  />
                </div>
                <div className={styles.input}>
                  <p>Password</p>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Enter your password"
                  />
                </div>
              </>
            ) : isRegistered ? (
              <div
                className={styles.registerSuccess}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <FaEnvelope size={48} fill="#6486ff" />
                <p
                  style={{
                    marginTop: "20px",
                    fontSize: "22px",
                    color: "#6486ff",
                  }}
                >
                  Check your email
                </p>
              </div>
            ) : !page ? (
              <>
                <div className={styles.input}>
                  <p>Email</p>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Enter your email"
                  />
                </div>
                <div className={styles.input}>
                  <p>Password</p>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Enter your password"
                  />
                </div>
                <div className={styles.input}>
                  <p>Confirm your password</p>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Enter your password one more time"
                  />
                </div>
                <div className={styles.checks}>
                  <div className={classNames(styles.check)}>
                    <div
                      className={classNames(styles.checkCircle, {
                        [styles["checkCircle--active"]]: formData.is.password,
                        [styles["checkCircle--inactive"]]:
                          !formData.is.password,
                      })}
                    ></div>
                    <p
                      className={classNames({
                        [styles["text--active"]]: formData.is.password,
                        [styles["text--inactive"]]: !formData.is.password,
                      })}
                    >
                      Your password must be between 8 and 32 characters long
                    </p>
                  </div>
                  <div className={classNames(styles.check)}>
                    <div
                      className={classNames(styles.checkCircle, {
                        [styles["checkCircle--active"]]:
                          formData.is.confirmPassword && formData.is.password,
                        [styles["checkCircle--inactive"]]: !(
                          formData.is.confirmPassword && formData.is.password
                        ),
                      })}
                    ></div>
                    <p
                      className={classNames({
                        [styles["text--active"]]:
                          formData.is.confirmPassword && formData.is.password,
                        [styles["text--inactive"]]: !(
                          formData.is.confirmPassword && formData.is.password
                        ),
                      })}
                    >
                      The passwords must match
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.input}>
                  <p>Nickname</p>
                  <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Enter your nickname"
                  />
                </div>
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                  multiple={false}
                  children={
                    <>
                      <p className={styles.chooseFileS}>Choose your avatar</p>
                      <div className={styles.chooseFile}>
                        {file ? (
                          <>
                            <PiCheckCircleLight
                              style={{
                                width: "74px",
                                height: "74px",
                                fill: "#3e508f",
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <svg
                              width="56"
                              height="74"
                              viewBox="0 0 56 74"
                              fill="#3e508f"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M46.6667 71.6875C50.5312 71.6875 53.6667 68.5801 53.6667 64.75V26.0012C53.6667 25.8133 53.6521 25.6254 53.6375 25.4375H36.1667C32.9437 25.4375 30.3333 22.8504 30.3333 19.6562V2.34141C30.1437 2.3125 29.9542 2.3125 29.7646 2.3125H9.33333C5.46875 2.3125 2.33333 5.41992 2.33333 9.25V64.75C2.33333 68.5801 5.46875 71.6875 9.33333 71.6875H46.6667ZM52.6604 23.125C52.5438 22.9805 52.4271 22.8504 52.3104 22.7348L33.0604 3.67109C32.9292 3.54102 32.7979 3.42539 32.6667 3.32422V19.6562C32.6667 21.5785 34.2271 23.125 36.1667 23.125H52.6604ZM0 9.25C0 4.14805 4.18542 0 9.33333 0H29.7646C31.6167 0 33.3958 0.737109 34.7083 2.03789L53.9437 21.0871C55.2562 22.3879 56 24.1512 56 25.9867V64.75C56 69.852 51.8146 74 46.6667 74H9.33333C4.18542 74 0 69.852 0 64.75V9.25ZM8.16667 32.375C8.16667 30.8417 8.78125 29.3712 9.87521 28.287C10.9692 27.2028 12.4529 26.5938 14 26.5938C15.5471 26.5938 17.0308 27.2028 18.1248 28.287C19.2188 29.3712 19.8333 30.8417 19.8333 32.375C19.8333 33.9083 19.2188 35.3788 18.1248 36.463C17.0308 37.5472 15.5471 38.1562 14 38.1562C12.4529 38.1562 10.9692 37.5472 9.87521 36.463C8.78125 35.3788 8.16667 33.9083 8.16667 32.375ZM14 35.8438C14.9283 35.8438 15.8185 35.4783 16.4749 34.8278C17.1313 34.1773 17.5 33.295 17.5 32.375C17.5 31.455 17.1313 30.5727 16.4749 29.9222C15.8185 29.2717 14.9283 28.9062 14 28.9062C13.0717 28.9062 12.1815 29.2717 11.5251 29.9222C10.8687 30.5727 10.5 31.455 10.5 32.375C10.5 33.295 10.8687 34.1773 11.5251 34.8278C12.1815 35.4783 13.0717 35.8438 14 35.8438ZM25.4625 52.6961C25.2583 52.9996 24.9083 53.173 24.5437 53.1875C24.1792 53.202 23.8292 53.043 23.5958 52.7539L19.2792 47.4207L19.2646 47.4062C19.2646 47.4062 19.25 47.4062 19.25 47.4207L9.625 60.125C9.43542 60.3707 9.33333 60.6742 9.33333 60.9922C9.33333 61.7871 9.98958 62.4375 10.7917 62.4375H45.1792C45.9958 62.4375 46.6667 61.7727 46.6667 60.9633C46.6667 60.6598 46.5646 60.3563 46.3896 60.1105L33.25 41.6539L25.4479 52.6961H25.4625ZM33.25 39.3125C33.9937 39.3125 34.6937 39.6738 35.1167 40.2664L48.3 58.7664C48.7521 59.4023 49 60.1684 49 60.9488C49 63.0445 47.2937 64.7355 45.1792 64.7355H10.7917C8.69167 64.7355 7 63.059 7 60.9777C7 60.1684 7.2625 59.3734 7.75833 58.723L17.3833 46.0187C17.8354 45.4262 18.5208 45.0793 19.2646 45.0793C19.9792 45.0793 20.6646 45.3973 21.1021 45.9609L24.4417 50.0945L31.3833 40.2664C31.8062 39.6594 32.5062 39.298 33.2646 39.298L33.25 39.3125Z"
                                fill="#3E508F"
                              />
                            </svg>
                          </>
                        )}
                        <span>Drag & Drop</span>
                      </div>
                    </>
                  }
                />
              </>
            )}
          </div>
          <div className={styles.submit}>
            <div className={styles.button} onClick={() => changePage()}>
              {typePage == "login"
                ? "Login"
                : isRegistered
                ? "Successful"
                : page
                ? "Sing up"
                : "Continue"}
            </div>
            {typePage == "login" ? null : isRegistered ? null : (
              <div className={styles.dots}>
                <div className={styles.dotBlue}></div>
                <div className={dotClasses}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
