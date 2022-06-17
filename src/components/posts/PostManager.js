import { fetchIt } from "../utils/Fetch";
import { Settings } from "../utils/Settings"


export const getAllPosts = () => fetchIt(`${Settings.API}/posts`)

export const getSinglePost = id => fetchIt(`${Settings.API}/posts/${id}`)

export const createPost = newPost => fetchIt(`${Settings.API}/posts`, "POST", newPost)

export const editPost = (postId, post) => fetchIt(`${Settings.API}/posts/${postId}`, "PUT", post)

export const deletePost = id => fetchIt(`${Settings.API}/posts/${id}`, "DELETE")
