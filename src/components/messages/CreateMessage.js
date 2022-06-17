import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createMessage } from "./MessageManager";
import { getAllZasUsers } from "../zasUsers/ZasUsersManager";


export const MessageForm = () => {

  const [recipients, setRecipients] = useState([])
  const [form, updateForm] = useState({
    'subject': '',
    'content': '',
    'recipient': ''
  })
  const history = useHistory()

  useEffect(
    () => {
      getAllZasUsers().then(setRecipients)
    },
    []
  )


  const submitMessage = e => {
    e.preventDefault()
    const newMessage = {
      author: parseInt(localStorage.getItem("userId")),
      subject: form.subject,
      createdOn: (new Date()).toISOString().split('T')[0],
      content: form.content,
      recipient: form.recipient
    }
    if (newMessage.subject && newMessage.recipient && newMessage.content) {
      createMessage(newMessage)
        .then(() => history.push(`/messages/inbox`))
    } else {
      window.alert("Please finish filling out messages form.")
    }
  }


  return (
    <>
      <fieldset>
        <div className="form-group">
          <input
            required
            type="text" id="message"
            className="form-control"
            placeholder="Recipient"
            defaultValue={form.recipient}
            onChange={
              e => {
                const copy = { ...form }
                const username = e.target.value
                // Match name to recipient.name
                const recipientObj = recipients?.find(recipient =>
                  username === recipient.name
                )
                // get recipient id from matched object
                copy.recipient = recipientObj?.id
                updateForm(copy)
              }
            }
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <input
            required
            type="text" id="message"
            className="form-control"
            placeholder="Title"
            defaultValue={form.subject}
            onChange={
              e => {
                const copy = { ...form }
                copy.subject = e.target.value
                updateForm(copy)
              }
            }
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <input
            required
            type="text" id="message"
            className="form-control"
            placeholder="Content"
            defaultValue={form.content}
            onChange={
              e => {
                const copy = { ...form }
                copy.content = e.target.value
                updateForm(copy)
              }
            }
          />
        </div>
      </fieldset>
      <div className="submitButtonCreateNewMessageForm">
        <button onClick={e => {
          submitMessage(e)
        }} className="submit-button">
          Submit
        </button>
      </div>
      <div>
        <button onClick={
          () => {
            history.push("/messages/inbox")
          }
        }>
          Cancel
        </button>
      </div>
    </>
  )
}
