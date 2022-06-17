import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllZasUsers } from "../zasUsers/ZasUsersManager";
import { deleteMessage, getAllMessages } from "./MessageManager";
import "./Messages.css"

export const AllMessages = () => {

  const [messages, setMessages] = useState([])
  const [toggle, setToggle] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(
    () => {
      getAllMessages().then(setMessages)
      .then(getAllZasUsers).then(setUsers)
    },
    []
  )

  useEffect(
    () => {
      getAllMessages().then(setMessages)
    },
    [toggle]
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
            <button
              onClick={
                e => {
                  e.preventDefault()
                  deleteMessage(message.id)
                    .then(setToggle(!toggle))
                }
              }
            >
              Delete
            </button>
          </div>
        })
        :
        <div>"No messages"</div>
    }

    <Link to="/messages/create">
      <button>
        Compose New Message
      </button>
    </Link>
  </>
}
