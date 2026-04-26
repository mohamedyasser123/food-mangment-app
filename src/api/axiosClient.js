import axios from "axios";

export const axiosClient=axios.create({
    baseURL:"https://upskilling-egypt.com:3006/api/v1",
    timeout:5000,
    headers:{
        "Content-Type":"application/json"
    }
});
axiosClient.interceptors.request.use((config)=>{
      const token=localStorage.getItem('token');
      if(token){
        config.headers['Authorization']=`Bearer${token}`;
    
      }
      return config;
    },(error)=>{
        return Promise.reject(error)
    }
);
axiosClient.interceptors.response.use( (response) => {
    return response;
  },(error)=>{
     if (error.response && error.response.status === 401){
        localStorage.clear();
       window.location.href = '/login';

     }
     return Promise.reject(error);
  }

)
