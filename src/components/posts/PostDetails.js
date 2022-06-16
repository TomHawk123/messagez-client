import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "./PostManager";

export const PostDetails = () => {

  const { postId } = useParams()
  const [post, setPost] = useState({})

  useEffect(
    () => {
      getSinglePost(postId).then(setPost)
    },
    []
  )


  return(
    <>
    <section key={`post--${post.id}`} className="postDetails">
      <h3 className="post-body">{post.body}</h3>
      {post.replies?.map(reply => {
        return <p className="post-reply">{reply.content}</p>
      })}
    </section>
    </>
  )
}
