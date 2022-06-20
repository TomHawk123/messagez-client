import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAllZasUsers } from "../zasUsers/ZasUsersManager";
import { createPost, editPost, getSinglePost } from "./PostManager";


export const PostForm = ({ editing }) => {

  const [tags, setTags] = useState([])
  const [form, updateForm] = useState({
    'title': '',
    'body': '',
    'tags': []
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

  useEffect(
    () => {
      getAllZasUsers().then(setTags)
    },
    []
  )

  const handleControlledInputChange = e => {
    /*
        When changing a state object or array, always create a new one
        and change state instead of modifying current one
    */
    const newPost = Object.assign({}, form)
    if (e.target.name === "tags") {
      if (!(e.target.name in newPost)) {
        newPost[e.target.name] = []
      }
      let val = parseInt(e.target.id)
      if (e.target.checked) {
        newPost[e.target.name].push(tags.find(tag => tag.id === val))
      } else {
        newPost[e.target.name] = newPost[e.target.name].filter(tag => tag.id !== val)
      }
    } else {
      newPost[e.target.name] = e.target.value
    }
    updateForm(newPost)
  }

  const submitPost = e => {
    e.preventDefault()
    let tagsToAdd = []
    if (form.tags && form.tags.length > 0) {
      tagsToAdd = form.tags.map(tag=>{
        return tag.id
      })
    }
    const newPost = {
      author: parseInt(localStorage.getItem("userId")),
      title: form.title,
      createdOn: (new Date()).toISOString().split('T')[0],
      body: form.body,
      tags: tagsToAdd
    }
    if (newPost.title && newPost.body) {
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

      {tags.map(tag => {
        // logic to determine whether box should be pre-checked
        let checked_status = false
        if ("tags" in form) {
          if (form.tags.length > 0) {
            let found_tag = form.tags.find(t => t.id === tag.id)
            if (found_tag) {
              checked_status = true
            } else {
              checked_status = false
            }
          } else {
            checked_status = false
          }
        }
        return <div key={`formTags-${tag.id}`} className="checkbox">
          <input name="tags"
            type="checkbox"
            htmlFor="tag"
            id={tag.id}
            onChange={handleControlledInputChange}
            checked={checked_status}
          />
          <label htmlFor={tag.id}>{tag.name}</label>
        </div>
      })
      }

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
