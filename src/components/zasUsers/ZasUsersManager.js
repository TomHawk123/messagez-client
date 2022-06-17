import { fetchIt } from "../utils/Fetch";
import { Settings } from "../utils/Settings"


export const getAllZasUsers = () => fetchIt(`${Settings.API}/users`)

export const getSingleZasUser = id => fetchIt(`${Settings.API}/users/${id}`)

export const createZasUser = newZasUser => fetchIt(`${Settings.API}/users`, "POST", newZasUser)

export const editZasUser = (userId, user) => fetchIt(`${Settings.API}/users/${userId}`, "PUT", user)

export const deleteZasUser = id => fetchIt(`${Settings.API}/users/${id}`, "DELETE")