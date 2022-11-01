import React, {useState, useEffect, useMemo, useLayoutEffect} from 'react'
import Message from './Message';
import { v4 as uuidv4 } from 'uuid';
import { orderBy, collection, query, where, onSnapshot, setDoc, serverTimestamp, doc   } from "firebase/firestore";
import { db, auth } from '../firebase';

const ChatPart = (props) => {
    const {
        currentChatPerson
    } = props;

    const [messagesChatPerson, setMessagesChatPerson] = useState([])
    const [messagesCurrentPerson, setMessagesCurrentPerson] = useState([])
    const [textArreaMessage, setTextArreaMessage] = useState("");

    const messages = useMemo(()=>{
        const newArray = [...messagesChatPerson, ...messagesCurrentPerson].sort((a, b) => a.dataSend?.seconds - b.dataSend?.seconds);
        return newArray;
    }, [messagesChatPerson, messagesCurrentPerson])
    

   useLayoutEffect(()=>{
        const q = query(collection(db, "Messages"), where("id_person", "==", currentChatPerson.id), where("message_to", "==", auth.currentUser.uid ), orderBy('data_send', 'asc'));
        const q1 = query(collection(db, "Messages"), where("id_person", "==", auth.currentUser.uid), where("message_to", "==", currentChatPerson.id ), orderBy('data_send', 'asc'));

        const unsubscribeChatPerson = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({id: doc.data().id_person, dataSend: doc.data().data_send, name: doc.data().name, message: doc.data().message});
            });
            setMessagesChatPerson(messages);
        }, (eroare)=>console.log("Eroare unsubscribeChatPerson: ", eroare));

        const unsubscribeCurrentPerson = onSnapshot(q1, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({id: doc.data().id_person, dataSend: doc.data().data_send, name: doc.data().name, message: doc.data().message});
            });
            setMessagesCurrentPerson(messages)
        }, (eroare)=>console.log("Eroare unsubscribeCurrentPerson: ", eroare));

        return () => {unsubscribeChatPerson(); unsubscribeCurrentPerson();};

   }, [currentChatPerson])

   const handleChange = (e) => {
    if(e === "")
    setTextArreaMessage(e);
    else
    setTextArreaMessage(e.target.value)
   }

   const writeMessage = async (e) => {
    
    if(e.key === 'Enter' || e.type === 'click')
    {
        e.preventDefault();
        handleChange("");
        if(textArreaMessage.trim() != ""){
            const documentName = uuidv4();
            await setDoc(doc(db, "Messages", documentName), {
                data_send: serverTimestamp(),
                id_person: auth.currentUser.uid,
                message: textArreaMessage,
                message_to: currentChatPerson.id,
                name: auth.currentUser.displayName
                });
        }
    }
   }

  return (
    <div className='bg-slate-300 w-full h-full flex flex-col'>
        <div className='flex-1 bg-blue-200 p-3 overflow-y-auto'>
            <Message currentChatPerson={currentChatPerson} messages={messages} />
        </div>
        <div className='w-full flex items-center h-14'>
            <textarea value={textArreaMessage} onChange={handleChange} onKeyDown={writeMessage} className='p-1 focus:outline-none bg-blue-300 w-full resize-none h-full border-t-[2px] border-blue-50'></textarea>
            <div className='bg-white h-full flex items-center px-6 cursor-pointer' onClick={writeMessage}>Send</div>
        </div>
    </div>
  )
}

export default ChatPart