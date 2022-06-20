import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteReply } from "../replies/ReplyManager";
import { getAllZasUsers } from "../zasUsers/ZasUsersManager";
import { getSinglePost } from "./PostManager";
import "./Posts.css"

export const PostDetails = () => {

  const { postId } = useParams()
  const [post, setPost] = useState({})
  const [users, setUsers] = useState([])
  const [toggle, setToggle] = useState(true)

  useEffect(
    () => {
      getAllZasUsers().then(setUsers)
        .then(getSinglePost(postId).then(setPost))
    },
    []
  )

  useEffect(
    () => {
      getSinglePost(postId).then(setPost)
    },
    [toggle]
  )

  const respondentName = (respondentId) => {
    for (const user of users) {
      if (respondentId === user.id)
        return user.name
    }
  }


  return (
    <>
      <section key={`post--${post.id}`} className="postDetails">
        <div className="postDetails-box">
          <h1 className="post-title">{post.title}</h1>
          <h3 className="post-body">{post.body}</h3>
          {
            post.replies?.map(reply => {
              return <>
                <ul key={`reply--${reply.id}`} className="post-reply">
                  <li>
                    {respondentName(reply.respondent)} replied:
                  </li>
                  {reply.content} {
                    reply.respondent === parseInt(localStorage.getItem('userId'))
                      ?
                      <button
                        onClick={
                          (e) => {
                            e.preventDefault()
                            deleteReply(reply.id)
                              .then(setToggle(!toggle))
                          }
                        }
                      >Delete</button>
                      :
                      null
                  }
                </ul>

              </>
            })
          }
          <Link to={`/replies/create/${postId}`}>
            <button className="replyToPost-btn">Reply</button>
          </Link>
        </div>
      </section>
    </>
  )
}
