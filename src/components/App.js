import React, { useState } from "react";
import AppRouter from './Router';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      {/* 따로 쓰는 이유 footer 를 추가할 수도있음 */}
      <footer>&copyul {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
