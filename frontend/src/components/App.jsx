import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main/Main";
import Home from "./Home";
import Footer from "./Footer";
import uniqid from "uniqid";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // All three constants passed to Main component to render inner-components based on their state.
  const [isAdmin, setIsAdmin] = useState(true);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  //
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Passed to Home component to get the user type of the user logged in.
  function handleUser() {
    //setIsAdmin(true);
    //setIsTeacher(true);
    //setIsStudent(true);
  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  //Passed to Home component and Header component to accomodate logout by the user.
  function invertIsLoggedIn() {
    setIsLoggedIn((prev) => {
      return !prev;
    });
  }

  function handleLogin(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const reqPayload = {
      username: payload.get("username"),
      password: payload.get("password"),
      cookieID: uniqid(), //you left here
    };
    invertIsLoggedIn();
  }

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        invertIsLoggedIn={invertIsLoggedIn}
        username={username}
      />
      {isLoggedIn ? (
        <Main isAdmin={isAdmin} isTeacher={isTeacher} isStudent={isStudent} />
      ) : (
        <Home
          handleLogin={handleLogin}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleUser={handleUser}
        />
      )}
      {isLoggedIn ? null : <Footer />}
    </div>
  );
}

export default App;
