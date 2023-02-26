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
        <span className="">지금 일어나고 있는 일</span>      
        <span className="h4">오늘 트위터에 가입하세요.</span>      
      </div>
      <div className="authBtns">
        <button name="google" className="authBtn" onClick={onSocialClick}>Google 계정으로 가입하기  <FontAwesomeIcon icon={faGoogle} /> </button>
        <button name="github" className="authBtn" onClick={onSocialClick}>Github 계정으로 가입하기 <FontAwesomeIcon icon={faGithub} /></button>
      </div>
      <div className="contour">
        <div className="hr"></div>
        또는
        <div className="hr"></div>
      </div>
      <AuthForm />
    </div>
)}
export default Auth