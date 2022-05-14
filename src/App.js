import React, { useState } from "react";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import LogIn from './logIn/LogIn';
import SignUp from './signUp/SignUpMain';
import ChatPage from "./chatPage/ChatPage";
import "./App.css"

function App() {

  const [token, setToken] = useState("");

  const chagneToken = (t) => {
    setToken(t);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn setToken={chagneToken}/>}>  </Route>
          <Route path="/signup" element={<SignUp setToken={chagneToken}/>}></Route>
          <Route path="/chat" element={<ChatPage token={token} setToken={chagneToken}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;