"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { useDispatch, useSelector, } from 'react-redux'
import { addMessage, selectChatState } from '@/lib/redux/slices/ChatSlice'
import { startLoading, stopLoading, selectChatLoadingState } from '@/lib/redux/slices/ChatLoader'
import { getChat } from '@/lib/chathelper'
import { useEventListener } from "usehooks-ts"

const Chatinput = ({ companionId, companionName }: { companionId: string, companionName: string }) => {

  const { messages } = useSelector(selectChatState);
  const { loading } = useSelector(selectChatLoadingState);
  const [disabled, setDisabled] = useState(false)
  const [inp, setInp] = useState("")
  const dispatch = useDispatch();

  const isActuallyDisabled = disabled || loading || (messages.length > 0 && messages[messages.length - 1].role === "user");

  const handlemessage = async () => {
    if (!inp || isActuallyDisabled) return
    setDisabled(true)
    dispatch(addMessage({ message: { parts: inp, role: "user" } }))
    dispatch(startLoading())
    const res = await getChat({ messages, currentMess: { parts: inp }, companionId })
    if (res?.parts) {
      // @ts-ignore
      dispatch(addMessage({ message: res }))
    } else {
      dispatch(addMessage({ message: { role: "model", parts: "" } }))
    }
    setInp("")
    dispatch(stopLoading())
    setDisabled(false)
  }

  useEventListener("keydown", async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      await handlemessage()
    }
  })



  return (
    <div className=' p-2 flex space-x-2 items-center w-full max-w-5xl mx-auto'>
      <Input value={inp} spellCheck="true" disabled={isActuallyDisabled} placeholder={`# chat with ${companionName}`} onChange={(e) => setInp(e.target.value)} className=' py-6 bg-white text-black text-lg' />
      <Button onClick={handlemessage} isDisabled={isActuallyDisabled} className=' bg-neutral-700/50'><Send /> </Button>
    </div>
  )
}

export default Chatinput