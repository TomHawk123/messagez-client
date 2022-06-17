import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { createReply, editReply, getSingleReply } from "./ReplyManager";


export const ReplyForm = ({ editing }) => {

  const [tags, setTags] = useState([])
  const [form, updateForm] = useState({
    'subject': '',
    'content': ''
  })
  const { postId } = useParams()
  const history = useHistory()


  useEffect(
    () => {
      if (editing) {
        getSingleReply(postId)
          .then(updateForm)
      }
    }, []
  )

  // const handleControlledInputChange = e => {
  //   /*
  //       When changing a state object or array, always create a new one
  //       and change state instead of modifying current one
  //   */
  //   const newReply = Object.assign({}, form)
  //   if (e.target.name === "tags") {
  //     if (!(e.target.name in newReply)) {
  //       newReply[e.target.name] = []
  //     }
  //     let val = parseInt(e.target.id)
  //     if (e.target.checked) {
  //       newReply[e.target.name].push(tags.find(tag => tag.id === val))
  //     } else {
  //       newReply[e.target.name] = newReply[e.target.name].filter(tag => tag.id !== val)
  //     }
  //   } else {
  //     newReply[e.target.name] = e.target.value
  //   }
  //   updateForm(newReply)
  // }

  const submitReply = e => {
    e.preventDefault()
    let tagsToAdd = []
    if (form.tags && form.tags.length > 0) {
      tagsToAdd = form.tags
    }
    const newReply = {
      author: parseInt(localStorage.getItem("userId")),
      subject: form.subject,
      createdOn: (new Date()).toISOString().split('T')[0],
      content: form.content,
      tags: tagsToAdd
    }
    if (newReply.subject) {
      if (editing) {
        newReply.id = parseInt(postId)
        return editReply(postId, newReply)
          .then(() => history.push(`/posts/${postId}`))
      } else {
        createReply(newReply)
          .then(() => history.push(`/posts`))
      }
    } else {
      window.alert("Please finish filling out post form.")
    }
  }

  return (
    <>
      <fieldset>
        <div className="form-group">
          <input
            required
            type="text" id="post"
            className="form-control"
            placeholder="Subject"
            value={form.subject}
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
            type="text" id="post"
            className="form-control"
            placeholder="Content"
            value={form.content}
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
      <div className="submitButtonCreateNewPostForm">
        <button onClick={e => {
          submitPost(e)
            .then(updateForm({ subject: "", content: "" }))
        }} className="submit-button">
          Submit
        </button>
      </div>
      <div>
        <button onClick={
          () => {
            history.push("/posts")
          }
        }>
          Cancel
        </button>
      </div>
    </>
  )
}
