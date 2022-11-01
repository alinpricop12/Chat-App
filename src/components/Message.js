import React, {useEffect, useLayoutEffect, useState} from 'react'

const Message = (props) => {

    const {
        currentChatPerson,
        messages
    } = props;
    
    const [allMessages, setAllMessages] = useState([])

    useLayoutEffect(()=>{
        const allMessages = messages.map((message, index) => {
            return(
                <div id={index} key={index} className={`w-full flex ${currentChatPerson.id === message.id ? "justify-start" : "justify-end"} ${index !== 0 ? "mt-4" : ""}`}>
                    <div className={`break-all flex flex-col text-white p-2 w-fit max-w-[75%] sm:max-w-[50%] h-fit ${currentChatPerson.id === message.id ? "rounded-tl-lg rounded-tr-lg rounded-br-lg bg-blue-600" : "rounded-tl-lg rounded-tr-lg rounded-bl-lg bg-blue-500"} `}>
                        <div className='text-[10px] sm:text-sm border-b border-white'>{message.name}</div>
                        <div className='text-[12px] sm:text-[14px]'>{message.message.trim()}</div>
                    </div>
                </div>
            )
        })
        setAllMessages(allMessages);

    }, [messages])

    useEffect(()=>{
        if(allMessages.length !== 0){
            let objDiv = document.getElementById(`${allMessages.length - 1}`);
            objDiv.scrollIntoView();
        }
    },[allMessages])
    
  return (
    <>
        {allMessages}
    </>

  )
}

export default Message