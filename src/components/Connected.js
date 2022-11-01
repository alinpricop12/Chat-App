import React, {useState} from 'react'
import {signOut} from 'firebase/auth'
import { auth } from '../firebase';
import Users from './Users';
import ChatPart from './ChatPart';


const Connected = () => {

    const [currentChatPerson, setCurrentChatPerson] = useState(null) 
    const googleSignOut = () => {
        signOut(auth).then(() => console.log('Sign out successfully!'))
      }

  return (
    <>
        {/* sidebar */}
        <div className='flex flex-col bg-slate-300 h-full w-1/4 border-r-[2px] border-blue-50'>
            <div className='w-full flex-1 overflow-y-auto'>
                <div className='font-semibold text-center py-4'>FRIENDS</div>
                <Users currentChatPerson={currentChatPerson} setCurrentChatPerson={setCurrentChatPerson} />
            </div>
            <div onClick={googleSignOut} className='text-center font-semibold py-4 bg-white cursor-pointer'>
                    Sign Out
            </div>
        </div>

        {/* chatting part */}
        <div className='w-full h-full flex justify-center items-center flex-col gap-2'>
            {currentChatPerson === null 
            ?
                (
                    <>
                        <div className='text-3xl font-semibold text-center'>Welcome to the chat app!</div>
                        <div className='text-center'>Click a person from the FRIENDS section and start chatting!</div>
                    </>
                )
            :   <ChatPart currentChatPerson={currentChatPerson}/>
            }
            

        </div>
    </>
  )
}

export default Connected