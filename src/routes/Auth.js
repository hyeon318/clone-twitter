import AuthForm from 'components/AuthForm';
import { authService } from 'fbase';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () =>{
  const onSocialClick = async (event) => {
    const {target:{name}} = event;
    let provider;
    if(name === "google"){
      provider = new GoogleAuthProvider();
    }else if(name === "github"){
      provider = new GithubAuthProvider();
    }

    const result = await signInWithPopup(authService, provider);
    console.log(result);
  }

  return (
    <div className="authContainer">
      <div>
        <FontAwesomeIcon
          icon={faTwitter}
          color={"#04AAFF"}
          size="3x"
          style={{ marginBottom: 30 }}
        />
      </div>
      <AuthForm />
      <div className="authBtns">
        <button name="google" className="authBtn" onClick={onSocialClick}>Continum With Google<FontAwesomeIcon icon={faGoogle} /> </button>
        <button name="github" className="authBtn" onClick={onSocialClick}>Continum With GitHub<FontAwesomeIcon icon={faGithub} /></button>
      </div>
    </div>
)}
export default Auth