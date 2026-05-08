import { axiosClient } from "../axiosClient"

export const getCategories=(pageNumber, pageSize,name)=>{
    return axiosClient.get("/Category" ,{
    params: {pageNumber,pageSize,name}
  })

}
export const AddCategories=(data)=>{
    return axiosClient.post("/Category",data)

}
export const updateCategoriesById=(id,data)=>{
    return axiosClient.put(`/Category/${id}`,data)

}
export const deleteCategoriesById=(id)=>{
    return axiosClient.delete(`/Category/${id}`)

}