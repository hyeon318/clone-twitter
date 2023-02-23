import { authService } from 'fbase';
import React, { useEffect, useState } from "react";
import AppRouter from 'components/Router';

function App() {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])

  setInterval(() => {
    // console.log(authService.currentUser);
  }, 5000)


  return (
    <>
      {
        init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initialized"
      }
      {/* 따로 쓰는 이유 footer 를 추가할 수도있음 */}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
