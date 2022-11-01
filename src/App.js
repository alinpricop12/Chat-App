import React, {useEffect} from 'react'
import GoogleButton from 'react-google-button'
import Connected from './components/Connected';

import { GoogleAuthProvider, signInWithRedirect} from "firebase/auth";
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth, db } from './firebase';
import { doc, setDoc, getDoc} from 'firebase/firestore';

import './index.css'


const App = () => {

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  }
  
  const [user] = useAuthState(auth);

  useEffect(() => {
    if(user) {
      const verifyIfUserExistInDatabase = async () => {
        const docRef = doc(db, "Users", `${user.uid}`)
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) 
          return true;
          else
          return false;
      }

      verifyIfUserExistInDatabase().then(res=>{
        if(res === false){
          const setDocument = async () => 
            setDoc(doc(db, "Users", `${user.uid}`), {
              name: user.displayName,
              email: user.email,
              id: user.uid,
            })
          setDocument();
          console.log('User is added in the database!');
        } else {
          console.log('User already exist in database!');
        }
      })   
  }
  }, [user])
  
  return (
    <div className='fixed h-full w-screen flex justify-center items-center'>
        {user 
        ?
          <div className='flex h-[100%] md:h-4/5  w-[100%] md:w-[70%] bg-blue-300 border-[7px] border-blue-400 drop-shadow-2xl md:rounded-md'>
            <Connected />
          </div>
        : 
          <div className='gap-5 flex justify-center items-center flex-col h-[100%] md:h-4/5  w-[100%] md:w-[70%] bg-blue-300 border-[7px] border-blue-400 drop-shadow-2xl md:rounded-md'>
            <div>
              <div className='font-semibold text-2xl'>Chat with me!</div>
              <div className='opacity-70'>(Log into your account)</div>
            </div>
            <div><GoogleButton onClick={googleLogin}/></div>
          </div>
        }
    </div>
  )
}

export default App