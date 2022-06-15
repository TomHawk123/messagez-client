import React from "react"
import { Route } from "react-router-dom"
import { AllMessages } from "./messages/AllMessages"
import { AllPosts } from "./posts/AllPosts"


export const ApplicationViews = () => {
    return <>
        <Route exact path="/">
            <AllPosts />
        </Route>
        <Route exact path="/posts">
            <AllPosts />
        </Route>
        <Route exact path="/messages">
            <AllMessages />
        </Route>
    </>
}
