import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "./PostManager";

export const AllPosts = () => {

  const [posts, setPosts] = useState([])

  useEffect(
    () => {
      getAllPosts().then(setPosts)
    },
    []
  )

  return <>
    {
      posts.length > 0
        ? posts.map(post => {
          return <div
            key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.body}</Link>
          </div>
        })
        :
        <div>"No posts"</div>
    }
    <Link to="/posts/create">
      <button className="createPost">
        Create Post
      </button>
    </Link>
  </>
}
