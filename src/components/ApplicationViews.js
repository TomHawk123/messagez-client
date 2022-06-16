import React from "react"
import { Route } from "react-router-dom"
import { AllMessages } from "./messages/AllMessages"
import { AllPosts } from "./posts/AllPosts"
import { PostForm } from "./posts/PostForm"
import { PostDetails } from "./posts/PostDetails"


export const ApplicationViews = () => {
    return <>
        <Route exact path="/">
            <AllPosts />
        </Route>
        <Route exact path="/posts">
            <AllPosts />
        </Route>
        <Route exact path="/messages/inbox">
            <AllMessages />
        </Route>
        <Route exact path="/posts/:postId(\d+)">
            <PostDetails />
        </Route>
        <Route exact path="/newPost">
            <PostForm editing={false} />
        </Route>
        <Route exact path="/editPost/:postId(\d+)">
            <PostForm editing={true} />
        </Route>
    </>
}
