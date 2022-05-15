import React, { useState } from "react";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import LogIn from './logIn/LogIn';
import SignUp from './signUp/SignUpMain';
import ChatPage from "./chatPage/ChatPage";
import "./App.css"

function App() {

  const [username, setUsername] = useState("");

  const changeUsername = (user) => {
    setUsername(user);
  }

  const [token, setToken] = useState("");

  const changeToken = (t) => {
    setToken(t);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn setToken={changeToken} setUsername={changeUsername}/>}>  </Route>
          <Route path="/signup" element={<SignUp setToken={changeToken} setUsername={changeUsername}/> }></Route>
          <Route path="/chat" element={<ChatPage token={token} setToken={changeToken} user={username} setUsername={changeUsername} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;