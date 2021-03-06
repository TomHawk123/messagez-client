import React from "react"
import { Route } from "react-router-dom"
import { AllMessages } from "./messages/Inbox"
import { AllPosts } from "./posts/AllPosts"
import { PostForm } from "./posts/PostForm"
import { PostDetails } from "./posts/PostDetails"
import { ReplyForm } from "./replies/ReplyForm"
import { MessageForm } from "./messages/CreateMessage"


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
        <Route exact path="/messages/create">
            <MessageForm />
        </Route>
        <Route exact path="/posts/:postId(\d+)">
            <PostDetails />
        </Route>
        <Route exact path="/posts/create">
            <PostForm editing={false} />
        </Route>
        <Route exact path="/editPost/:postId(\d+)">
            <PostForm editing={true} />
        </Route>
        <Route exact path="/replies/create/:postId(\d+)">
            <ReplyForm editing={false} />
        </Route>
        <Route exact path="/editReply/:replyId(\d+)">
            <ReplyForm editing={true} />
        </Route>
    </>
}
