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
        // 방법1
        setUserObj(user);

        // 방법2
        // setUserObj({
        //   displayName: user.displayName
        //   , uid: user.uid
        //   , updateProfile : (args) => {
        //     user.updateProfile(args)
        //   }
        // });
          // updateProfile 은 function

      }else{
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser;

    // 방법1
    setUserObj(Object.assign({}, user))

    // 방법2
    // setUserObj({
    //   displayName: user.displayName
    //   , uid: user.uid  
    //   , updateProfile : (args) => {
    //     user.updateProfile(args)
    //   }
    // })
    // currentUser 의 사이즈가 너무 크기 떄문에 변화를 감지하는 기능이 힘들다 
    // -> 상태가 변경되더라도 리랜더링을 하지 않을 수 도있다.
    // 1. object 의 크기를 줄인다.
    console.log(authService.currentUser.displayName);
    // setUserObj(authService.currentUser);
  }

  return (
    <>
      {
        init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initialized"
      }
      {/* 따로 쓰는 이유 footer 를 추가할 수도있음 */}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
