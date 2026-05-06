import { axiosClient } from "../axiosClient"

export const getCategories=()=>{
    return axiosClient.get("/Category")

}
export const AddCategories=(data)=>{
    return axiosClient.post("/Category",data)

}
export const updateCategoriesById=(data)=>{
    return axiosClient.post("Category",data)

}
export const deleteCategoriesById=(id)=>{
    return axiosClient.delete(`/Category/${id}`)

}