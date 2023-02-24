import { upload } from '@testing-library/user-event/dist/upload';
import Nweet from 'components/Nweet';
import { dbService, storageService } from 'fbase';
import { addDoc, collection, getDocs, onSnapshot,  orderBy,  query } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useEffect, useState } from "react";
import { v4 } from 'uuid';

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("");           // nweet 1개 info
  const [nweets, setNweets] = useState([]);         // nweets list
  const [attachment, setAttachment] = useState("")  // 첨부파일 

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

  const onSubmit = async (event) => {
    event.preventDefault();

    let attachmentUrl = "";
    if(attachment !== ""){
      const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    
    }
    setNweet("");
    setAttachment("");
    const nweetObject = {
      text : nweet
      , createdAt : Date.now()
      , creatorId : userObj.uid
      , attachmentUrl 
    }
    await addDoc(collection(dbService, "nweets"), nweetObject)

    // const docRef = await addDoc(collection(dbService, "nweets"), {
    //   text : nweet
    //   , createdAt : Date.now()
    //   , creatorId : userObj.uid
    // })
    // setNweet("");
  }
  
  const onChange = (event) => {
    const {target :  {value}} = event;
    setNweet(value);
  }

  const onFileChange = (event) => {
    const {target:{files}} = event;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {currentTarget: {result}} = finishedEvent
      setAttachment(result);
    }

    if(theFile){
      reader.readAsDataURL(theFile);
    }

    console.log(event.target.files)
  } 

  const onClearAttachment = () => {
    setAttachment(""); 
  }

  return (
  <div>
    <form onSubmit={onSubmit}>
      <input type="text" value={nweet} onChange={onChange} placeholder="What's Your Mind?" maxLength={120} />
      <input type="file" accept='image/*' onChange={onFileChange} />
        {attachment && <div>
                        <img src={attachment} width="50px" height="50px"/>
                        <button onClick={onClearAttachment}>Clear</button>
                      </div>}
      <input type="submit" value="Nweet"/>
    </form>
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