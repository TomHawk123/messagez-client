import { fetchIt } from "../utils/Fetch";
import { Settings } from "../utils/Settings"


export const getAllReplies = () => fetchIt(`${Settings.API}/replies`)

export const getSingleReply = id => fetchIt(`${Settings.API}/replies/${id}`)

export const createReply = newReply => fetchIt(`${Settings.API}/replies`, "POST", newReply)

export const editReply = (id, reply) => fetchIt(`${Settings.API}/replies/${id}`, "PUT", reply)

export const deleteReply = id => fetchIt(`${Settings.API}/replies/${id}`, "DELETE")