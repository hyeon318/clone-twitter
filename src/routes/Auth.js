import React, { useState } from "react";

const Auth = () =>{

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const onChange = (event) => {
    const {target: {name, value}} = event;
    if(name === "email"){
      setEmail(value)
    }else if(name === "password") {
      setPassword(value)
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="email" placeholder='Email' required value={email} onChange={onChange}/>
        <input type="password" name="password" placeholder='Password' required value={password} onChange={onChange}/>
        <input type="submit" name="submit" value="Log In" />
      </form>

      <div>
        <button>Continum With Google</button>
        <button>Continum With GitHub</button>
      </div>
    </div>
)}
export default Auth