import { authService, dbService } from 'fbase';
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Profile = ({refreshUser, userObj}) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName ? userObj.displayName : "Unknown");
  useEffect(() => {
    getMyNweets(); 
  }, [])

  const getMyNweets = async() => {
    const q = query(
                collection(dbService, "nweets")
                , where("creatorId", "==", userObj.uid)
                , orderBy("createdAt", "desc"));

    console.log("userObj.uid : ",userObj.uid, q)
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map(document => {
      console.log(document.data())
      document.data();
    })
  }

  const onSubmit = async(event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName){
      // 이게 동작하나?
      console.log(userObj.displayName , newDisplayName);
      await updateProfile(authService.currentUser, {displayName: newDisplayName})
      // object 의 크기가 너무 클 경우 react에서 해당 벼경 감지에 문제가 생길 수 있다.
      // 1. object 의 크기를 줄인다.

      refreshUser();
    }
  }

  const onChange = (event) => {
    const {target : {value}} = event;
    setNewDisplayName(value);

    console.log(userObj.displayName !== newDisplayName)
  }

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  }
  return (<>
            <form onSubmit={onSubmit}>
              <input type="text" onChange={onChange} value={newDisplayName} placeholder='Display name'/>
              <input type="submit" placeholder='Update Profile'/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
          </>)
}
export default Profile;
// https://nomadcoders.co/nwitter/lectures/1917