import { authService, dbService } from 'fbase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';



const Profile = ({userObj}) => {
  const navigate = useNavigate();
  
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

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  }
  return (<>
            <button onClick={onLogOutClick}>Log Out</button>
          </>)
}
export default Profile;
// https://nomadcoders.co/nwitter/lectures/1917