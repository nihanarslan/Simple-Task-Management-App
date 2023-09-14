import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import "./LoginSignUp.css";

export default function LoginSignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      props.settingUser(currentUser);
    });
  }, [props]);

  const register = async () => {
    if (props.state !== "Sign Up") {
      setEmail("");
      setPassword("");
      props.settingState("Sign Up");
    } else {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      } catch (error) {
        if (error.code === "auth/weak-password") {
          alert(
            "The password is too weak. Password should be at least 6 characters"
          );
        } else if (error.code === "auth/invalid-email") {
          alert(
            "Please enter your email address in format: youremail@example.com"
          );
        } else if (error.code === "auth/email-already-in-use") {
          alert("An account with this email already exists.");
        }
        return;
      }

      alert("Sign Up successfull please login.");
      setEmail("");
      setPassword("");

      props.settingState("Login");
    }
  };

  const login = async () => {
    if (props.state !== "Login") {
      setEmail("");
      setPassword("");
      props.settingState("Login");
    } else {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if (error.code === "auth/invalid-email") {
          alert("Please enter your email address in format: youremail@example.com");
        } else if (error.code === "auth/wrong-password") {
          alert("Please check your password again.");
        } else if (error.code === "auth/missing-password") {
          alert("Please enter your password.");
        }
        return;
      }

      props.settingState("Logged In");
    }
  };

  const resetPassword = async() =>{
    try {
      const user = await sendPasswordResetEmail(auth,email);
      console.log("user:");
      console.log(user);
    } catch (error) {
      console.log(error.code);
    }
  }

  return (
    <div className="container">
      <div className="text">{props.state}</div>
      <div className="inputs">
        <div className="input">
          <img src="/email.png" alt=""></img>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="input">
          <img src="/password.png" alt=""></img>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        {props.state === "Sign Up" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Forgot Password? <span onClick={resetPassword}>Click Here!</span>
          </div>
        )}

        <div className="submit-container">
          <div
            className={props.state === "Login" ? "submit gray" : "submit"}
            onClick={register}
          >
            Sign Up
          </div>
          <div
            className={props.state === "Sign Up" ? "submit gray" : "submit"}
            onClick={login}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
}
