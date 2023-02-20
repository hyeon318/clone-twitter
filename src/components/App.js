import { authService } from 'fbase';
import React, { useState } from "react";
import AppRouter from 'components/Router';

function App() {

  console.log()
  
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      {/* 따로 쓰는 이유 footer 를 추가할 수도있음 */}
      <footer>&copyul {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
