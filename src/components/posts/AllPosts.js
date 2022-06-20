import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, getAllPosts } from "./PostManager";
import "./Posts.css"

export const AllPosts = () => {

  const [posts, setPosts] = useState([])
  const [toggle, setToggle] = useState(true)

  useEffect(
    () => {
      getAllPosts().then(setPosts)
    },
    [toggle]
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
                <h3>{post.title}</h3>
              </Link>
                <p>Posted By:{post.author.name}</p>
              {
                parseInt(localStorage.getItem('userId')) === post.id
                  ?
                  <Link to={`/editPost/${post.id}`}>
                    <button>Edit</button>
                  </Link>
                  :
                  null
              }
              {
                parseInt(localStorage.getItem('userId')) === post.author.id
                  ?
                    <button
                    onClick={
                      (e)=>{
                        e.preventDefault()
                        deletePost(post.id)
                        .then(setToggle(!toggle))
                      }
                    }
                    >Delete</button>
                  :
                  null
              }
            </div>
            <p>{post.body}</p>
            {post.tags.map(tag => {
              return <div key={`tag--${tag.id}`}>Tagged User:{tag.name}</div>
            })}
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
