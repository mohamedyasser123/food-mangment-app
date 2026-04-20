import React from 'react'
import { useForm } from 'react-hook-form';
import emailIcon from "../../../../assets/auth-icon/email-icon.svg"
import passIcon from "../../../../assets/auth-icon/password-icon.svg"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function RestPass() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  let navigate=useNavigate();


  const onSubmit = async(data) => {
    try{
      const response=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset",data);
      toast.success(response.data.message || "Password updated successfully!", {
      position: "top-right",
    });
    setTimeout(() => {
      navigate("/login"); 
    },1000);

  }catch(error){
      const errorMessage = error.response?.data?.message || "Reset failed, please try again";
    toast.error(errorMessage, {
      position: "top-right",
    });

    }
    
  };
  const password = watch("password");
  return (
    <div className="auth-content">
      <div className='title mb-4'>
        <h3 className='fw-bold h4 mb-1' style={{ color: '#333' }}>Reset Password</h3>
        <p className='text-muted small'>Please Enter Your Otp or Check Your Inbox</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <div className='input-group'>
            <span className='input-group-text border-0 border-end bg-transparent text-muted pe-3 my-2'>
              <img
                src={emailIcon}
                alt="icon"
                style={{ width: '20px', height: '20px' }}
              />
            </span>
            <input
              {...register("email", { required: "Email is required",
                 pattern:{
                value:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                message:"email not valid"
              }
               },)}
              className="form-control border-0 bg-transparent py-2"
              placeholder="Email"
            />
          </div>
          {errors.email && <span className='text-danger small mt-1 d-block'>{errors.email.message}</span>}
        </div>
        <div className='mb-3'>
          <div className='input-group '>
            <span className='input-group-text border-0 border-end bg-transparent text-muted pe-3 my-2'>
              <img
                src={passIcon}
                alt="icon"
                style={{ width: '20px', height: '20px' }}
              />
            </span>
            <input
              {...register("seed", { required: "OTP is required" })}
              className="form-control border-0 bg-transparent py-2"
              placeholder="OTP"
            />
          </div>
          {errors.seed && <span className='text-danger small mt-1 d-block'>{errors.seed.message}</span>}
        </div>
        <div className='mb-3'>
          <div className='input-group '>
            <span className='input-group-text border-0 border-end bg-transparent text-muted pe-3 my-2'>
              <img
                src={passIcon}
                alt="icon"
                style={{ width: '20px', height: '20px' }}
              />
            </span>
            <input
              {...register("password", {
                required: "New Password is required",
                minLength: { value: 6, message: "Min length is 6 characters" }
              })}
              type="password"
              className="form-control border-0 bg-transparent py-2"
              placeholder="New Password"
            />
            <span className='input-group-text border-0 border-end bg-transparent text-muted pe-3 my-2'>
            </span>
          </div>
          {errors.password && <span className='text-danger small mt-1 d-block'>{errors.password.message}</span>}
        </div>
        <div className='mb-4'>
          <div className='input-group '>
            <span className='input-group-text border-0 border-end bg-transparent text-muted pe-3 my-2'>
              <img
                src={passIcon}
                alt="icon"
                style={{ width: '20px', height: '20px' }}
              />
            </span>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: value => value === password || "Passwords do not match"
              })}
              type="password"
              className="form-control border-0 bg-transparent py-2"
              placeholder="Confirm New Password"
            />
            <span className='input-group-text border-0 bg-transparent text-muted cursor-pointer'>
            </span>
          </div>
          {errors.confirmPassword && <span className='text-danger small mt-1 d-block'>{errors.confirmPassword.message}</span>}
        </div>
        <button type='submit' className='btn btn-success w-100 py-2 fw-bold rounded-3' style={{ backgroundColor: '#4CAF50', border: 'none' }}>
          Reset Password
        </button>
      </form>
    </div>
  )
}
