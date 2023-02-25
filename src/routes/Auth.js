import AuthForm from 'components/AuthForm';
import { authService } from 'fbase';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from "react";

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
    <>
    <AuthForm />
      <div>
        <div>
          <button name="google" onClick={onSocialClick}>Continum With Google</button>
          <button name="github" onClick={onSocialClick}>Continum With GitHub</button>
        </div>
      </div>
    </>
)}
export default Auth