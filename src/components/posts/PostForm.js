import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { createPost, editPost, getSinglePost } from "./PostManager";


export const PostForm = ({ editing }) => {

  const [tags, setTags] = useState([])
  const [form, updateForm] = useState({
    'title': '',
    'body': ''
  })
  const { postId } = useParams()
  const history = useHistory()


  useEffect(
    () => {
      if (editing) {
        getSinglePost(postId)
          .then(updateForm)
      }
    }, []
  )

  // const handleControlledInputChange = e => {
  //   /*
  //       When changing a state object or array, always create a new one
  //       and change state instead of modifying current one
  //   */
  //   const newPost = Object.assign({}, form)
  //   if (e.target.name === "tags") {
  //     if (!(e.target.name in newPost)) {
  //       newPost[e.target.name] = []
  //     }
  //     let val = parseInt(e.target.id)
  //     if (e.target.checked) {
  //       newPost[e.target.name].push(tags.find(tag => tag.id === val))
  //     } else {
  //       newPost[e.target.name] = newPost[e.target.name].filter(tag => tag.id !== val)
  //     }
  //   } else {
  //     newPost[e.target.name] = e.target.value
  //   }
  //   updateForm(newPost)
  // }

  const submitPost = e => {
    e.preventDefault()
    let tagsToAdd = []
    if (form.tags && form.tags.length > 0) {
      tagsToAdd = form.tags
    }
    const newPost = {
      author: parseInt(localStorage.getItem("userId")),
      title: form.title,
      createdOn: (new Date()).toISOString().split('T')[0],
      body: form.body,
      tags: tagsToAdd
    }
    if (newPost.title) {
      if (editing) {
        newPost.id = parseInt(postId)
        return editPost(postId, newPost)
          .then(() => history.push(`/posts/${postId}`))
      } else {
        createPost(newPost)
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
            placeholder="Title"
            value={form.title}
            onChange={
              e => {
                const copy = { ...form }
                copy.title = e.target.value
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
            value={form.body}
            onChange={
              e => {
                const copy = { ...form }
                copy.body = e.target.value
                updateForm(copy)
              }
            }
          />
        </div>
      </fieldset>
      <div className="submitButtonCreateNewPostForm">
        <button onClick={e => {
          submitPost(e)
            .then(updateForm({ title: "", body: "" }))
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
