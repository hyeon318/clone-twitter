import { authService } from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';

const AuthForm = () => {
  
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

  const toggleAccount = () => {
    setNewAccount(!newAccount);
  }
  
  const onSubmit = async (event) => {
    event.preventDefault();
    try{
      if(newAccount){
        // 8 버전
        // create Account : https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
        // createUserWithEmailAndPassword ( email :  string ,  password :  string ) : Promise < UserCredential >  // return 이 promise
        // 9 버전
        // https://firebase.google.com/docs/reference/js/auth.emailauthprovider
        // const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await createUserWithEmailAndPassword(authService, email, password)

      }else{
        // log in
        await signInWithEmailAndPassword(authService, email, password)
      }
    }catch(error){
      setError(error.message);
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input type="email" name="email" placeholder='Email' required value={email} onChange={onChange} className="authInput"/>
        <input type="password" name="password" placeholder='Password' required value={password} onChange={onChange} className="authInput"/>
        <input type="submit" name="submit" value={newAccount ? "Create New Account" : "Log In"} className="authInput authSubmit"/>
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch"> {newAccount ? "Log In" : "Create Account"}</span>
    </>
  );
};

export default AuthForm;