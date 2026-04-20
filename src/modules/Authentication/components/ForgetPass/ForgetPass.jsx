import React from 'react'
import { useForm } from 'react-hook-form';
import emailIcon from "../../../../assets/auth-icon/email-icon.svg"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ForgetPass() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let navigate=useNavigate()

  const onSubmit = async(data) => {
    
    try{
      const response=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",data);
       navigate("/rest-pass");
      toast.success(response.data.message || "Check your email", {
      position: "top-right",
    });
   

    }catch(error){
      const errorMessage = error.response?.data?.message || "Failed to send request";
    toast.error(errorMessage, {
      position: "top-right",
    });

    }
    
  };
  return (
    <div className="auth-content">
      <div className='title mb-4'>
        <h3 className='fw-bold h4 mb-2'>Forgot Your Password?</h3>
        <p className='text-muted small'>No worries! Please enter your email and we will send a password reset link</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input-group mb-3 bg-light-rounded'>
          <span className='input-group-text border-0 border-end bg-transparent text-muted pe-3 my-2'> 
                 <img 
                  src={emailIcon} 
                  alt="icon" 
                  style={{ width: '20px', height: '20px' }}
                />
          </span>
            <input {...register("email",{
              required:"Field is required",
                pattern:{
                value:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                message:"email not valid"
              }
            })} type="email" className="form-control border-0 bg-transparent py-2" placeholder="enter your email"  aria-describedby="emailelpblock"/>
        </div>
        {errors.email &&<span className='text-danger'>{errors.email.message}</span>}

        <button type='submit' className='btn btn-success w-100 py-2 fw-bold rounded-3' style={{ backgroundColor: '#4CAF50', border: 'none' }}>
          Submit
        </button>
      </form>
    </div>
  )
}
