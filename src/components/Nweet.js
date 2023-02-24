import { dbService, storageService } from 'fbase';
import { deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react';

const Nweet = ({nweetObj, isOwner}) => {

  const [isEdit, setIsEdit] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  // 삭제버튼
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if(ok){
      // await deleteDoc(dbService,`nweets/${nweetObj.id}`);
      // deleteDoc 은 document type 을 parameter로 받음
      await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
      await deleteObject(ref(storageService, nweetObj.attachmentUrl));
    }
  }

  // 편집 여부
  const onToggleEdit = async() => {
    setIsEdit((prev) => !prev);
  }

  // nweet textbox 수정
  const onChangeNweet = (event) => {
    const {target: {name, value}} = event;
    setNewNweet(value);
  }

  // 수정완료
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(nweetObj, newNweet);
    
    await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {...nweetObj, text:newNweet});
    setIsEdit(false);
  }

  return (
    <div>
      {
        isEdit 
        ? <form onSubmit={onSubmit}> 
            <input type="text" value={newNweet} onChange={onChangeNweet} placeholder="Edit your edit" required/>
            <button type="submit">submit</button>
            <button onClick={onToggleEdit}>cancel</button>
          </form>
        : <>
            <h4>{newNweet}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px"/>}
            {isOwner && <button onClick={onDeleteClick}>Delete Nweet</button>}
            {isOwner && <button onClick={onToggleEdit}>Edit Nweet</button>}
          </>
      }
    </div>
  );
};

export default Nweet;