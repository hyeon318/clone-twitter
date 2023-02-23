import { dbService } from 'fbase';
import { addDoc, collection, getDocs, onSnapshot,  orderBy,  query } from 'firebase/firestore';
import React, { useEffect, useState } from "react";

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  
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
      console.log("Current Nweets in CA ",nweetArr);
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

  const onSubmit = async (event) => {
    event.preventDefault();

    const docRef = await addDoc(collection(dbService, "nweets"), {
      text : nweet
      , createdAt : Date.now()
      , creatorId : userObj.uid
    })
    setNweet("");
  }
  
  const onChange = (event) => {
    const {target :  {value}} = event;
    setNweet(value);
  }

  // console.log(nweets)

  return (
  <div>
    <form onSubmit={onSubmit}>
      <input type="text" value={nweet} onChange={onChange} placeholder="What's Your Mind?" maxLength={120} />
      <input type="submit" value="Nweet"/>
    </form>
    <div>
      {
        nweets.map(nweet => {
          return (<div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>)
        })
      }
    </div>
  </div>)
  }
export default Home; 