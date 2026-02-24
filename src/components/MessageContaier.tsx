"use client"
import { selectChatLoadingState } from '@/lib/redux/slices/ChatLoader';
import { clearMessages, selectChatState, setMessages } from '@/lib/redux/slices/ChatSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import Avatar from './Avatar';
import { useChatScroll } from '@/hook/useScroll';
import { cn } from '@/lib/utils';


interface Props {
    userAvatar: string | null
    companionAvatar: string | null
    userName: string
    compqnionName: string
    initialMessages?: any[]
}



const MessageContaier = ({ companionAvatar, userAvatar, userName, compqnionName, initialMessages }: Props) => {

    const dispatch = useDispatch()

    const { messages } = useSelector(selectChatState);
    const { loading } = useSelector(selectChatLoadingState)
    const ref = useChatScroll(messages);
    const [fkLoading, setFkLoading] = useState(true)




    useEffect(() => {
        if (initialMessages && initialMessages.length > 0) {
            dispatch(setMessages(initialMessages.map(m => ({ role: m.role, parts: m.content }))))
        } else {
            dispatch(clearMessages())
        }
        setTimeout(() => {
            setFkLoading(false)
        }, 1000);
    }, [dispatch, initialMessages])




    return (
        <div ref={ref} className='flex-1 h-full overflow-y-auto w-full max-w-5xl mx-auto'>
            {
                !fkLoading &&
                <div className={twMerge(' flex gap-1 p-2')}>
                    <Avatar imgUrl={companionAvatar} name={compqnionName} />
                    <div className=' min-w-60 max-w-[50%] px-5 py-2 h-max rounded-xl bg-neutral-500/20'>
                        hello, {userName}
                    </div>
                </div>
            }
            {
                messages && messages.map((message, i) => (
                    <div key={i} className={twMerge(' flex gap-1 p-2', message?.role === "user" ? " flex-row-reverse" : " flex-row")}>

                        {
                            message?.role === "user" ?
                                <Avatar imgUrl={userAvatar} name={userName} />
                                :
                                <Avatar imgUrl={companionAvatar} name={compqnionName} />
                        }

                        <p key={i} dangerouslySetInnerHTML={{ __html: message.parts }} className={cn(
                            "min-w-60 max-w-[50%] px-5 py-2 h-max rounded-xl bg-neutral-500/20",
                            // message.role === "user" && "self-end"
                        )} />

                    </div>
                ))
            }
            {
                (loading || fkLoading) &&
                <div className={twMerge(' flex gap-1 p-2')}>
                    <Avatar imgUrl={companionAvatar} name={compqnionName} />
                    <div className=' min-w-60 max-w-[50%] px-5 py-5 h-max rounded-xl bg-neutral-500/20 animate-pulse transition-all duration-1000'>
                    </div>
                </div>
            }
        </div>
    )
}

export default MessageContaier



//   <div className=' min-w-60 max-w-[50%] px-5 py-2 h-max rounded-xl bg-neutral-500/20'>
//                     {message?.parts.length ?
//                         message.parts.split('\n').map((paragraph, index) => (
//                             <p key={index}>{paragraph.replace(/\*/g, '').replace(/\*\s+/g, ',\n* ')}</p>
//                         ))
//                         :
//                         <p className=' text-rose-400 text-sm'>something went wrong please try again</p>
//                     }
//                 </div>