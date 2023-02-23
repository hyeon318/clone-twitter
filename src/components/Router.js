import React, { useState } from "react";
import {HashRouter as Router, Route, Switch, Routes, Navigate} from "react-router-dom"
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';

const AppRouter = ({isLoggedIn, userObj}) => 
{
  // 원래는 router 안에 switch 형식이었지만 hooks component를 사용하여 로그인 여부로 구분한다.
  console.log("isLoggedIn : ",isLoggedIn)
  return (
    <Router>
      {isLoggedIn && <Navigation/>}
      <Routes>
        {isLoggedIn?
        (<>
          <Route path="/" element={<Home userObj={userObj}/>} />
          <Route path="/profile" element={<Profile />} />
        </>) :
        (<>
          <Route path="/" element={<Auth />} />
        </>)
        }
      </Routes>
    </Router>
  )
}

export default AppRouter;