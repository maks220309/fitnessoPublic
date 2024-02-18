import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import Penis from "./components/hello world page/src/App.jsx";
import Calendar from "./components/Calendar";
import Exercises from "./components/Exercises";
import Exercise from "./components/Exercise";
import AIAssistant from "./components/AIAssistant";
import Pipiska from "./components/auth/Auth";
import Chat from "./components/Chat";
import Account from "./components/Account.jsx";
import App from "./App.jsx";
import Layout from "./Layout.jsx";
import { MdError } from "react-icons/md";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Penis />,
  },
  {
    path: "/login",
    element: <Pipiska typePAPAPAAPAGEGEGEGGE={"login"} />,
  },
  {
    path: "/registration",
    element: <Pipiska typePAPAPAAPAGEGEGEGGE={"registration"} />,
  },
  {
    path: "/app", 
    element: <Layout />,
    children: [
      { path: "calendar", element: <Calendar /> },
      { path: "chat", element: <Chat /> },
      { path: "exercises", element: <Exercises /> },
      { path: "exercise/:id", element: <Exercise /> },
      { path: "aiassistant", element: <AIAssistant /> },
      { path: "account", element: <Account /> },
    ],
  },
  { path: "*", element: <MdError /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
