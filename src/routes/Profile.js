import { authService } from 'fbase';
import React from "react";

const onLogOutClick = () => {
  authService.signOut();
}

const Profile = () => 
  <>
    <button onClick={onLogOutClick}>Log Out</button>
  </>
export default Profile;
// https://nomadcoders.co/nwitter/lectures/1917