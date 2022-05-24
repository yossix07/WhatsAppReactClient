import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import LogIn from './logIn/LogIn';
import SignUp from './signUp/SignUpMain';
import ChatPage from "./chatPage/ChatPage";
import AuthorizationErrorModal from "./AuthorizationErrorModal";
import "./App.css"
import * as signalR from "@microsoft/signalr";


function App() {

  const [username, setUsername] = useState("");

  const changeUsername = (user) => {
    setUsername(user);
    localStorage.setItem("username", user);
    setHub(user);
  }

  const [token, setToken] = useState("");

  const changeToken = (t) => {
    setToken(t);
    localStorage.setItem("token", t);
  }

  const [isAuthorizationModalOpen, setIsErrorModalOpen] = useState(false);

  const showErrorModal = () => {
    setIsErrorModalOpen(true);
  };
  const hideErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const [connection, setConnection] = useState(null);
  async function setHub(user) {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5146/myHub")
      .build();
    await connection.start().then(() => {
      setConnection(connection);
      connection.invoke("Connect", user);
    })
  }

  return (
    <>
      <BrowserRouter>
        <AuthorizationErrorModal isOpen={isAuthorizationModalOpen} hideModal={hideErrorModal}></AuthorizationErrorModal>
        <Routes>
          <Route path="/" element={<LogIn setToken={changeToken} setUsername={changeUsername} />}></Route>

          <Route path="/signup" element={<SignUp setToken={changeToken} setUsername={changeUsername} />}></Route>

          <Route path="/chat" element={<ChatPage token={localStorage.getItem("token")}
            setToken={changeToken} user={localStorage.getItem("username")} setUsername={changeUsername}
            showAuthorizationErrorModal={showErrorModal} connection={connection} setHub={setHub}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;