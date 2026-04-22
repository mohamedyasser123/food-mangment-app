import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate} from 'react-router-dom'
import emailIcon from "../../../../assets/auth-icon/email-icon.svg"
import passIcon from "../../../../assets/auth-icon/password-icon.svg"
import axios from 'axios'
import { toast } from 'react-toastify'


export default function Login( {saveLoginData}) {
  let {register,formState:{errors},handleSubmit}=useForm();
  let navigate=useNavigate()
  const onSubmit=async(data)=>{
    try{
      const response=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login",data);
      localStorage.setItem('token',response.data.token);
      saveLoginData();
      navigate('/dashboard');
      toast.success("Welcome ,Login Successful",{
        position:"top-right"
      })
    }catch(error){
      const message = error.response.data.message || "Invalid Email or Password";
      toast.error(message,{
        position:"top-right"
      })
    }
  }
  return (
    <div >
      <div className='title mb-4'>
        <h3 className='h5 mb-1'>Log In</h3>
        <span className='text-muted'>Welcome Back! Please enter your details</span>
      </div>
      <form className='mb-3' onSubmit={handleSubmit(onSubmit)}>
        <div className='input-group '>
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
         
         
         <div className='input-group mb-2 bg-light rounded'>
           <span className='input-group-text border-0 border-end bg-transparent text-muted pe-3 my-2'> 
              <img 
      src={passIcon} 
      alt="icon" 
      style={{ width: '20px', height: '20px' }}
    />
          </span>
            <input {...register('password',{
              required:"Field is required",
            
            })} type="password" className="form-control border-0 bg-transparent py-2" placeholder="enter your password"  aria-describedby="passwordelpblock"/>
        </div>
        {errors.password &&<span className='text-danger'>{errors.password.message}</span>}
        <div className='links d-flex justify-content-between mb-4 mt-2' >
          <Link to='/register' className="text-dark small">
          Register Now ?

          </Link>
          <Link to='/forget-pass' className="text-success text-decoration-none fw-medium fs-16"style={{ color: '#4AA35A' }} >
          Forget Password ?
          </Link>

        </div>
         <button type='submit' className='btn btn-success w-100 py-2 fw-bold rounded-3' style={{ backgroundColor: '#4CAF50', border: 'none' }}>
          Login
        </button>


      </form>
    </div>
  )
}
