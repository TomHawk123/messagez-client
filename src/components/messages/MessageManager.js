import { fetchIt } from "../utils/Fetch";
import { Settings } from "../utils/Settings"


export const getAllMessages = () => fetchIt(`${Settings.API}/messages`)

export const getSingleMessage = id => fetchIt(`${Settings.API}/messages/${id}`)

export const createMessage = newMessage => fetchIt(`${Settings.API}/messages`, "POST", newMessage)

export const editMessage = (id, message) => fetchIt(`${Settings.API}/messages/${id}`, "PUT", message)

export const deleteMessage = id => fetchIt(`${Settings.API}/messages/${id}`, "DELETE")