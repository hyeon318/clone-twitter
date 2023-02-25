import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 } from 'uuid';
import { upload } from '@testing-library/user-event/dist/upload';
import { addDoc, collection } from 'firebase/firestore';

const NweetFactory = ({userObj}) => {
  
  const [nweet, setNweet] = useState("");           // nweet 1개 info
  const [attachment, setAttachment] = useState("")  // 첨부파일 

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
      <form onSubmit={onSubmit}>
      <input type="text" value={nweet} onChange={onChange} placeholder="What's Your Mind?" maxLength={120} />
      <input type="file" accept='image/*' onChange={onFileChange} />
        {attachment && <div>
                          <img src={attachment} width="50px" height="50px"/>
                          <button onClick={onClearAttachment}>Clear</button>
                        </div>}
      <input type="submit" value="Nweet"/>
    </form>
  );
};

export default NweetFactory;