import { axiosClient } from "../axiosClient"

export const Login=(data)=>{
    return axiosClient.post("/Users/Login",data)

}