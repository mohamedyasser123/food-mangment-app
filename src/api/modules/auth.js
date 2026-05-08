import { axiosClient } from "../axiosClient"

export const Login=(data)=>{
    return axiosClient.post("/Users/Login",data)

}
export const userRegister=(data)=>{
    return axiosClient.post("/Users/Register",data)

}
export const  verifyAccount=(data)=>{
    return axiosClient.put("Users/verify",data)

}
export const  changePassword=(data)=>{
    return axiosClient.put("Users/ChangePassword",data)

}