import { axiosClient } from "../axiosClient"

export const getusers=()=>{
    return axiosClient.get("/Users")

}
export const deleteUserById=(id)=>{
    return axiosClient.delete(`/Users/${id}`)

}