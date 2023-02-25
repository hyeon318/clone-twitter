import { upload } from '@testing-library/user-event/dist/upload';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';
import { dbService, storageService } from 'fbase';
import { addDoc, collection, getDocs, onSnapshot,  orderBy,  query } from 'firebase/firestore';
import React, { useEffect, useState } from "react";

const Home = ({userObj}) => {
  const [nweets, setNweets] = useState([]);         // nweets list
// export declare function onSnapshot<T>(query: Query<T>, observer: {
//     next?: (snapshot: QuerySnapshot<T>) => void;
//     error?: (error: FirestoreError) => void;
//     complete?: () => void;
// }): Unsubscribe;

  useEffect(() => {
    // getNweets();
    // db 에 데이터가 변경될 경우 자동적으로 ack 를 받음
    subscribe();
  }, []);

  const subscribe = () => {
    const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      console.log("snapshot", snapshot);
      const nweetArr = snapshot.docs.map((document) => { 
        return {
          // 근데 id 는 왜 따로 받지? 그냥 document.data 로 받아오면 되지 않나?
            id: document.id
          , ...document.data()
        }
      });
      setNweets(nweetArr);
      // console.log("Current Nweets in CA ",nwezetArr);
    })
  }

  // 구식이래,,
  // const getNweets = async () => {
  //   // getDocs return : Promise<QuerySnapshot<T>>;
  //   const dbNweets = await getDocs(collection(dbService, "nweets"));
  //   dbNweets.forEach(document => {
  //     const nweetObject = {
  //       ...document.data()
  //       , id: document.id
  //     }
  //     return setNweets(prev => [nweetObject, ...prev])
  //   })
  //   console.log(dbNweets);
  // }

  return (
  <div>
    <NweetFactory userObj={userObj}/>
    <div>
      {
        nweets.map(nweet => {
          return (<Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>)
        })
      }
    </div>
  </div>)
  }
export default Home; 