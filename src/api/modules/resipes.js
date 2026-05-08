import { axiosClient } from "../axiosClient"

export const getResipes = (page, name, size) => {
  return axiosClient.get("/Recipe", {
    params: { pageNumber: page, name: name, pageSize: size }
  });
}
export const getResipesById=(id)=>{
    return axiosClient.get(`/Recipe/${id}`)

}
export const updateResipesById=(id,data)=>{
    return axiosClient.put(`/Recipe/${id}`,data)

}
export const deleteResipesById=(id)=>{
    return axiosClient.delete(`/Recipe/${id}`)

}
export const getTagsResipes=(id)=>{
    return axiosClient.get(`/tag`)

}

export const AddRecipes=(data)=>{
    return axiosClient.post("/Recipe",data)

}