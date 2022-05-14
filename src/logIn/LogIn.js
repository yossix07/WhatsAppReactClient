import { useState, useRef } from "react";
import LogInForm from "./LogInForm";
import $ from "jquery"
import LogInFailed from "./LogInFailure";
import { useNavigate } from "react-router-dom";
import { LogInAsync } from "../Users/DBQuerys";


function LogIn(props) {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };

  const name = useRef("");
  const pass = useRef("");

  let navigate = useNavigate();

  $(document).ready(function () {
    $("#logInForm").on("submit", async function (event) {
      event.preventDefault();
      var token = await LogInAsync(name.current.value, pass.current.value);
      if(token != -1) {
        props.setToken(token);
        navigate("/chat", { replace: true });
      } else {
        // TODO - failed to register
      }

    });
  });

  return (
    <div>
      <LogInFailed isOpen={isOpen} hideModal={hideModal}></LogInFailed>
      <LogInForm name={name} pass={pass}></LogInForm>
    </div>
  );
}

export default LogIn;