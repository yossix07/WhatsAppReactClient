import React, { useEffect, useRef, useState } from "react";
import "./SignUp.css";
import SignUpForm from "./SignUpForm";
import SignUpSuccess from "./SignUpSuccess";
import SignUpFail from "./SignUpFail";
import { validateUsername, validatePassword, validateRepeatedPassword, validatePic } from "./Validation";
import { addNewUserAsync } from "../Users/DBQuerys";
import $ from "jquery";
import InvalidFileModal from "../InvalidFileModal";

function SignUp(props) {
  const [file, setFile] = useState();
  function fileUpload(e) {
    if (validatePic(e.target.files[0])) {
      setFile(URL.createObjectURL(e.target.files[0]));
      pic = e.target.files[0];
    } else {
      showInvalidPicModal();
    }
  }

  function removePicture(e) {
    setFile();
  }

  const [isInvalidFileModalOpen, setIsInvalidFileModalOpen] = useState(false);

  const showInvalidPicModal = () => {
    setIsInvalidFileModalOpen(true);
  };
  const hideInvalidPicModal = () => {
    setIsInvalidFileModalOpen(false);
  };



  const [isSignUpSuccesModalOpen, setIsSignUpSuccesModalOpen] = useState(false);
  const showSignUpSuccesModal = () => {
    setIsSignUpSuccesModalOpen(true);
  };
  const hideSignUpSuccesModal = () => {
    setIsSignUpSuccesModalOpen(false);
  };

  const [isSignUpFailModalOpen, setIsSignUpFailModalOpen] = useState(false);

  const showSignUpFailModal = () => {
    setIsSignUpFailModalOpen(true);
  };
  const hideSignUpFailModal = () => {
    setIsSignUpFailModalOpen(false);
  };


  const name = useRef("");
  const pass = useRef("");
  const rePass = useRef("");
  var pic = null;


  $(document).ready(function () {
    $("#signUpForm").unbind("submit").on("submit", async function (event) {
      event.preventDefault();
      if (name.current.value && validateUsername(name.current.value) && pass.current.value && rePass.current.value
        && validatePassword(pass.current.value, rePass.current.value) && validateRepeatedPassword(pass.current.value, rePass.current.value)) {
          var token  = await addNewUserAsync(name.current.value, pass.current.value);
          if(token != -1) {
            props.setToken(token);
            props.setUsername(name.current.value);
            showSignUpSuccesModal();
          } else {
            showSignUpFailModal();
          }
        
      }
      return false;
    });
  });

  const checkButton = () => {
    if (name.current.value && validateUsername(name.current.value) && pass.current.value && rePass.current.value
      && validatePassword(pass.current.value, rePass.current.value) && validateRepeatedPassword(pass.current.value, rePass.current.value)) {
      document.getElementById("signUpButton").removeAttribute("disabled", "");
    }
    else {
      document.getElementById("signUpButton").setAttribute("disabled", "");
    }
  }

  useEffect(() => {
    document.getElementById("SignUpUsername").addEventListener("keyup", function (event) { validateUsername(name.current.value); checkButton(); })
    document.getElementById("SignUpPassword").addEventListener("keyup", function (event) { validatePassword(pass.current.value, rePass.current.value); checkButton(); })
    document.getElementById("SignUpRePassword").addEventListener("keyup", function (event) { validateRepeatedPassword(pass.current.value, rePass.current.value); checkButton(); })
  }, [])

  return (
    <div>
      <InvalidFileModal isOpen={isInvalidFileModalOpen} hideModal={hideInvalidPicModal} text="Picture format must be one of the following: jpg/jpeg/png/svg"></InvalidFileModal>
      <SignUpSuccess isOpen={isSignUpSuccesModalOpen} hideModal={hideSignUpSuccesModal} name={name.current.value}></SignUpSuccess>
      <SignUpFail isOpen={isSignUpFailModalOpen} hideModal={hideSignUpFailModal} ></SignUpFail>
      <SignUpForm name={name} pass={pass} rePass={rePass} 
        file={file} fileUpload={fileUpload} removePicture={removePicture}></SignUpForm>
    </div>
  );
}

export default SignUp;