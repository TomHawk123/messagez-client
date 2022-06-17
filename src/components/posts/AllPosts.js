import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "./PostManager";
import "./Posts.css"

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
            key={post.id}
            className="posts">
            <div>
              <Link to={`/posts/${post.id}`}>
                {
                  parseInt(localStorage.getItem('userId')) === post.author
                    ?
                    <Link to={`/editPost/${post.id}`}>
                      <button className="editPost-btn">Edit</button>
                    </Link>
                    :
                    null
                }
                <h3>{post.title}</h3>
              </Link>
            </div>
            <p>{post.body}</p>
          </div>
        })
        :
        <div>"No posts"</div>
    }
    <Link to="/posts/create">
      <button className="createPost-btn">
        Create Post
      </button>
    </Link>
  </>
}
