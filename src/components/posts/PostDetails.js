import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSinglePost } from "./PostManager";
import "./Posts.css"

export const PostDetails = () => {

  const { postId } = useParams()
  const [post, setPost] = useState({})

  useEffect(
    () => {
      getSinglePost(postId).then(setPost)
    },
    []
  )


  return (
    <>
      <section key={`post--${post.id}`} className="postDetails">
        <div className="postDetails-box">
          <h1 className="post-title">{post.title}</h1>
          <h3 className="post-body">{post.body}</h3>
          {
            post.replies?.map(reply => {
              return <div key={`reply--${reply.id}`} className="post-reply">
                {reply.content}
              </div>
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
