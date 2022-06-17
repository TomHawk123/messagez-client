import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
      post: parseInt(postId),
      respondent: parseInt(localStorage.getItem('userId')),
      content: form.content,
      createdOn: (new Date()).toISOString().split('T')[0],
      tags: tagsToAdd
    }
    if (newReply.content) {
      if (editing) {
        newReply.id = parseInt(postId)
        return editReply(postId, newReply)
          .then(() => history.push(`/posts/${postId}`))
      } else {
        createReply(newReply)
          .then(() => history.push(`/posts/${postId}`))
      }
    } else {
      window.alert("Please finish filling out reply form.")
    }
  }

  return (
    <>
      <fieldset>
        <div className="form-group">
          <input
            required
            type="text" id="reply"
            className="form-control"
            placeholder="Subject"
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
      <div className="submitButtonCreateNewReplyForm">
        <button onClick={e => {
          submitReply(e)
            .then(updateForm({ content: "" }))
        }} className="submit-button">
          Submit
        </button>
      </div>
      <div>
        <Link to={`/posts/${postId}`}>
          <button>
            Cancel
          </button>
        </Link>
      </div>
    </>
  )
}
