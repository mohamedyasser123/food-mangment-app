import React from 'react'
import { useForm } from 'react-hook-form';
import emailIcon from "../../../../assets/auth-icon/email-icon.svg"
import passIcon from "../../../../assets/auth-icon/password-icon.svg"

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { verifyAccount } from '../../../../api/modules/auth';
export default function VerifyAccount() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  let navigate=useNavigate();


    const onSubmit = async (data) => {
    try {
      const response = await verifyAccount(data);
      toast.success(response.data.message || "Account Verified Successfully!");
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Verification failed, please check your OTP";
      toast.error(errorMessage);
    }
  }
 return (
 <div className="auth-content"> 
      <div className='title mb-4'>
        <h3 className='fw-bold h4 mb-1' style={{ color: '#333' }}>Verify Account</h3>
        <p className='text-muted small'>Please Enter Your Otp or Check Your Inbox</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3 bg-light rounded-3 px-2 border'>
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
                 </div>
        {errors.email && <span className='text-danger small mb-2 d-block ms-2'>{errors.email.message}</span>}

        {/* OTP Input */}
          <div className='mb-3 bg-light rounded-3 px-2 border'>
         <div className='input-group '>
                    <span className='input-group-text border-0 border-end bg-transparent text-muted pe-3 my-2'>
                      <img
                        src={passIcon}
                        alt="icon"
                        style={{ width: '20px', height: '20px' }}
                      />
                    </span>
                    <input
                      {...register("code", { required: "OTP is required" })}
                      className="form-control border-0 bg-transparent py-2"
                      placeholder="OTP"
                    />
                  </div>
                  </div>
                  {errors.seed && <span className='text-danger small mt-1 d-block'>{errors.seed.message}</span>}

        <button type='submit' className='btn btn-success w-100 py-2 fw-bold rounded-3 shadow-sm' style={{ backgroundColor: '#4CAF50', border: 'none' }}>
          Verify Account
        </button>
      </form>
    </div>

);

}