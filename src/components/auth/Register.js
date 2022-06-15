import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { registerUser } from "./AuthManager"
import './Auth.css'
// TODO: This should get you started on registering a new user. 
// Add new fields depending on your server side registration
export const Register = () => {
  const email = useRef()
  const password = useRef()
  const firstName = useRef()
  const lastName = useRef()
  const title = useRef()
  const bio = useRef()
  const history = useHistory()

  const handleRegister = (e) => {
    e.preventDefault()

    const newUser = {
      "email": email.current.value,
      "password": password.current.value,
      'name': `${firstName.current.value} ${lastName.current.value}`,
      'title': title.current.value,
      'username': `${firstName.current.value} ${lastName.current.value}`,
      'bio': bio.current.value,
      'created_on': Date.now()
    }

    registerUser(newUser).then(res => {
      if ("token" in res) {
        localStorage.setItem("auth_token", res.token)
        history.push("/")
      }
    })
  }

return (
  <main>
    <form onSubmit={handleRegister}>
      <h3>Register an account</h3>
      <fieldset>
        <label htmlFor="inputFirstName">First Name</label>
        <input ref={firstName} type="text" name="firstName" placeholder="first name" required />
      </fieldset>
      <fieldset>
        <label htmlFor="inputLastName">Last Name</label>
        <input ref={lastName} type="text" name="lastName" placeholder="last name" required />
      </fieldset>
      <fieldset>
        <label htmlFor="inputTitle">Job Title</label>
        <input ref={title} type="text" name="title" placeholder="Software Engineer, CEO, Marketing Manager..." required />
      </fieldset>
      <fieldset>
        <label htmlFor="inputEmail">Email</label>
        <input ref={email} type="email" name="email" placeholder="Email" required />
      </fieldset>
      <fieldset>
        <label htmlFor="inputBio"> About Me: </label>
        <input ref={bio} type="text" name="bio" placeholder="I love to swim. I am passionate about tech." required />
      </fieldset>
      <fieldset>
        <label htmlFor="inputPassword"> Password </label>
        <input ref={password} type="password" name="password" placeholder="Password" required />
      </fieldset>
      <fieldset>
        <button type="submit">Register</button>
      </fieldset>
    </form>
    <section>
      Already registered? <Link to="/login">Login</Link>
    </section>
  </main>
)
}
