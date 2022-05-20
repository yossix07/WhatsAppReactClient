import React, { useState } from "react";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import LogIn from './logIn/LogIn';
import SignUp from './signUp/SignUpMain';
import ChatPage from "./chatPage/ChatPage";
import AuthorizationErrorModal from "./GenericErrorModal";
import "./App.css"

function App() {

  const [username, setUsername] = useState("");

  const changeUsername = (user) => {
    setUsername(user);
    localStorage.setItem("username", user);
    console.log(localStorage.getItem("username"))
  }

  const [token, setToken] = useState("");

  const changeToken = (t) => {
    setToken(t);
    localStorage.setItem("token", t);
    console.log(localStorage.getItem("token"))
  }

  const [isAuthorizationModalOpen, setIsErrorModalOpen] = useState(false);

  const showErrorModal = () => {
    setIsErrorModalOpen(true);
  };
  const hideErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <>
      <BrowserRouter>
        <AuthorizationErrorModal isOpen={isAuthorizationModalOpen} hideModal={hideErrorModal}></AuthorizationErrorModal>
        <Routes>
          <Route path="/" element={<LogIn setToken={changeToken} setUsername={changeUsername}/>}></Route>

          <Route path="/signup" element={<SignUp setToken={changeToken} setUsername={changeUsername}/>}></Route>

          <Route path="/chat" element={<ChatPage token={localStorage.getItem("token")}
            setToken={changeToken} user={localStorage.getItem("username")} setUsername={changeUsername}
            showAuthorizationErrorModal={showErrorModal}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;