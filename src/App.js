import "./App.css";
import KanbanBoard from "./components/KanbanBoard";
import LoginSignUp from "./components/LoginSignUp";
import { useState } from "react";
import { Navbar } from "react-bootstrap";
import { auth } from "./firebase";
import {
  signOut,
} from "firebase/auth";


function App() {
  const [state, setState] = useState("Sign Up");
  const [user, setUser] = useState({});

  const settingState = (stateMessage) => {
    setState(stateMessage);
  };

  const settingUser = (userInf) => {
    setUser(userInf);
  };

  const logout = async () => {
    await signOut(auth);
    settingState("Login");
  };

  return (
    <div className="App">
      {state === "Logged In" ? (
        <div className="mainpage">
          <Navbar bg="dark" data-bs-theme="dark" className="navbar">
            <Navbar.Brand href="#">Simple Task Management</Navbar.Brand>
            <Navbar.Text onClick={logout}>Logout</Navbar.Text>
          </Navbar>
          <KanbanBoard user={user}/>
        </div>
      ) : (
        <LoginSignUp
          settingState={settingState}
          settingUser={settingUser}
          state={state}
          className="loginsignup"
        />
      )}
    </div>
  );
}

export default App;
