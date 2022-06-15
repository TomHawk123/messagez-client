import { useEffect, useState } from "react";
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
              {post.body}
              </div>
            })
            :
            <div>"No posts"</div>
        }
  </>
}
