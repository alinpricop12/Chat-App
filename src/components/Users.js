import React, {useEffect, useState} from 'react'
import {ReactComponent as PeopleIcons} from '../assets/person-circle-outline.svg'
import { collection, getDocs, onSnapshot, query } from "firebase/firestore"
import { auth, db } from '../firebase';

const Users = (props) => {
    const [users, setUsers] = useState([]);
    const {
        currentChatPerson,
        setCurrentChatPerson = () => {}
    } = props;

    const changeTheCurrentChatPerson = (id, name) =>{
        setCurrentChatPerson({id, name})
    }

    useEffect(()=>{
        const q = query(collection(db, "Users"));
        const unsub = onSnapshot(q, (querySnapshot) => {
                    const usersFromDatabase = [];
                    querySnapshot.forEach((doc, index) => {
                        const lastElement = querySnapshot.docs.length === (index + 1) ? true : false;
                        const {_document: {data: {value: {mapValue: {fields: {name, email, id}}}}}} = doc;
                        if(id.stringValue === auth.currentUser.uid) return null;
                        if((auth.currentUser.uid !== "u6yEMSdLNqQxyih1vXG6lssSQEk2") && (id.stringValue === "BeDrdikpCIMme3Z75xmzzDNgvfk2")){
                            return null;
                        }
                       
                        usersFromDatabase.push(
                            <div onClick={()=>changeTheCurrentChatPerson(id.stringValue, name.stringValue)} key={id.stringValue} className={`w-fit min-w-full ${currentChatPerson?.id === id.stringValue ? "bg-blue-400" : ""} flex items-center gap-2 py-2 h-12 cursor-pointer ${index === 0 ? "border-t-[2px]" : ""} ${lastElement === false ? "border-b-[2px] border-blue-50" : ""}`}>
                                <PeopleIcons height={'100%'} className="min-w-[40px]"/>
                                <div className='flex flex-col'>
                                    <div className='text-sm font-semibold'>{name.stringValue}</div>
                                    <div className='text-xs'>{email.stringValue}</div>
                                </div>
                            </div>
                        )
                    })
                    
                setUsers(usersFromDatabase.filter(elem => elem != null));
            });

        return () => unsub();
    }, [currentChatPerson])
    
  return (
    <>
        {users}
    </>
  )
}

export default Users