import { axiosClient } from "../axiosClient"

export const getFavList=(page, size)=>{
    return axiosClient.get("/userRecipe", {
    params: { pageNumber: page, pageSize: size }
  })

}
export const AddToFavourite=(data)=>{
    return axiosClient.post("/userRecipe",data)

}
export const deleteFromFavourite=(id)=>{
    return axiosClient.delete(`/userRecipe/${id}`)

}
