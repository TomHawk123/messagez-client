import { useEffect, useState } from "react";
import { getAllMessages } from "./MessageManager";

export const AllMessages = () => {

  const [messages, setMessages] = useState([])

  useEffect(
    () => {
      getAllMessages().then(setMessages)
    },
    []
  )

  return <>
    {
      messages.length > 0
        ? messages.map(message => {
          return <div
            className="messagesList"
            key={message.id}>
            <h3>{message.subject}</h3>
            <p>{message.content}</p>
          </div>
        })
        :
        <div>"No messages"</div>
    }
  </>
}
