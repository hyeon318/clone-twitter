import { authService } from 'fbase';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from "react";

const Auth = () =>{

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {target: {name, value}} = event;
    if(name === "email"){
      setEmail(value)
    }else if(name === "password") {
      setPassword(value)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try{
      let data ;
      if(newAccount){
        // 8 버전
        // create Account : https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
        // createUserWithEmailAndPassword ( email :  string ,  password :  string ) : Promise < UserCredential >  // return 이 promise
        // 9 버전
        // https://firebase.google.com/docs/reference/js/auth.emailauthprovider
        // const userCredential = await signInWithEmailAndPassword(auth, email, password);
        data = await createUserWithEmailAndPassword(authService, email, password)

      }else{
        // log in
        data = await signInWithEmailAndPassword(authService, email, password)
      }
      console.log(data)
    }catch(error){
      setError(error.message);
      console.log(error)
    }
  }

  const toggleAccount = () => {
    setNewAccount(!newAccount);
  }

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
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder='Email' required value={email} onChange={onChange}/>
        <input type="password" name="password" placeholder='Password' required value={password} onChange={onChange}/>
        <input type="submit" name="submit" value={newAccount ? "Create New Account" : "Log In"}/>
        {error}
      </form>
      <span onClick={toggleAccount}> {newAccount ? "Log In" : "Create Account"}</span>
      <div>
        <button name="google" onClick={onSocialClick}>Continum With Google</button>
        <button name="github" onClick={onSocialClick}>Continum With GitHub</button>
      </div>
    </div>
)}
export default Auth