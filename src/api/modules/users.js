import { axiosClient } from "../axiosClient"

export const getusers=(page, size,name)=>{
    return axiosClient.get("/Users", {
    params: { pageNumber: page, pageSize: size,userName:name }
  })

}
export const deleteUserById=(id)=>{
    return axiosClient.delete(`/Users/${id}`)

}