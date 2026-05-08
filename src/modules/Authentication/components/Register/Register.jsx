import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister } from '../../../../api/modules/auth';
import { toast } from 'react-toastify';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const navigate=useNavigate()
  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImgPreview(URL.createObjectURL(file));
  }
};

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
 const appendToFormData=(data)=>{
    const formData = new FormData();
    formData.append("userName",data.userName);
    formData.append("email",data.email);
    formData.append("country",data.country);
    formData.append("phoneNumber",data.phoneNumber);
    formData.append("password",data.password);
    formData.append("confirmPassword",data.confirmPassword);
   if (data.profileImage && data.profileImage[0]) {
            formData.append("profileImage", data.profileImage[0]);
        }
return formData;
  }
const onSubmit = async (data) => {
  let userData = appendToFormData(data); 
  try {
    const response = await userRegister(userData); 
    toast.success(response.data.message || "Account created successfully!");
    navigate("/verify-account"); 
  } catch (error) {
  const serverErrors = error.response?.data?.additionalInfo?.errors;

  let msg = "Registration failed!";

  if (serverErrors) {
    msg = serverErrors.userName?.[0] || serverErrors.password?.[0] || "Invalid data";
  } else {
    msg = error.response?.data?.message || "Something went wrong!";
  }

  toast.error(msg);
}
};
  const profileImageFile = watch("profileImage");
  useEffect(()=>{
    if (profileImageFile && profileImageFile[0]) {
    const file = profileImageFile[0];
    setImgPreview(URL.createObjectURL(file));
  } else {
    setImgPreview(null); 
  }
  },[profileImageFile])
  return (
    <div className="container-fluid">
      <div className="title mb-4">
        <h3 className="h5 mb-1 fw-bold">Register</h3>
        <span className="text-muted">Welcome Back! Please enter your details</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* --- 1. Upload Image Section --- */}
        <div className="text-center mb-4">
          <div className="upload-wrapper position-relative d-inline-block">
            <label htmlFor="upload-img" className="bg-light border rounded-3 p-4 cursor-pointer d-flex flex-column align-items-center" style={{ borderStyle: 'dashed !important', width: '150px' }}>
      
              {imgPreview ? (
        <img 
          src={imgPreview} 
          alt="Preview" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      ) : (
        <>
          <i className="fa fa-camera text-muted fs-3 mb-2"></i>
          <span className="small text-muted">Upload Image</span>
        </>
      )}

              <input 
                {...register("profileImage")} 
                type="file" 
                id="upload-img" 
                className="d-none" 
                accept="image/*"
              />
            </label>
          </div>
        </div>

        {/* --- 2. Inputs Grid --- */}
        <div className="row g-3">
          {/* UserName */}
          <div className="col-md-6">
            <div className="input-group bg-light rounded-3">
              <span className="input-group-text border-0 bg-transparent text-muted"><i className="fa fa-user"></i></span>
              <input {...register("userName", { required: "User Name is required" })} className="form-control border-0 bg-transparent py-2" placeholder="UserName" />
            </div>
            {errors.userName && <span className="text-danger small">{errors.userName.message}</span>}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <div className="input-group bg-light rounded-3">
              <span className="input-group-text border-0 bg-transparent text-muted"><i className="fa fa-envelope"></i></span>
              <input {...register("email", { 
                required: "Email is required",
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email" }
              })} className="form-control border-0 bg-transparent py-2" placeholder="Enter your E-mail" />
            </div>
            {errors.email && <span className="text-danger small">{errors.email.message}</span>}
          </div>

          {/* Country */}
          <div className="col-md-6">
            <div className="input-group bg-light rounded-3">
              <span className="input-group-text border-0 bg-transparent text-muted"><i className="fa fa-globe"></i></span>
              <input {...register("country", { required: "Country is required" })} className="form-control border-0 bg-transparent py-2" placeholder="Country" />
            </div>
            {errors.country && <span className="text-danger small">{errors.country.message}</span>}
          </div>

          {/* PhoneNumber */}
          <div className="col-md-6">
            <div className="input-group bg-light rounded-3">
              <span className="input-group-text border-0 bg-transparent text-muted"><i className="fa fa-phone"></i></span>
              <input {...register("phoneNumber", { required: "Phone Number is required" })} className="form-control border-0 bg-transparent py-2" placeholder="PhoneNumber" />
            </div>
            {errors.phoneNumber && <span className="text-danger small">{errors.phoneNumber.message}</span>}
          </div>

          {/* Password */}
          <div className="col-md-6">
            <div className="input-group bg-light rounded-3">
              <span className="input-group-text border-0 bg-transparent text-muted"><i className="fa fa-lock"></i></span>
              <input 
                {...register("password", { required: "Password is required" })} 
                type={showPassword ? "text" : "password"} 
                className="form-control border-0 bg-transparent py-2" 
                placeholder="Password" 
              />
              <span className="input-group-text border-0 bg-transparent cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                <i className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} text-muted`}></i>
              </span>
            </div>
            {errors.password && <span className="text-danger small">{errors.password.message}</span>}
          </div>

          {/* Confirm Password */}
          <div className="col-md-6">
            <div className="input-group bg-light rounded-3">
              <span className="input-group-text border-0 bg-transparent text-muted"><i className="fa fa-lock"></i></span>
              <input 
                {...register("confirmPassword", { 
                  required: "Please confirm password",
                  validate: (value) => value === watch('password') || "Passwords do not match"
                })} 
                type={showConfirmPassword ? "text" : "password"} 
                className="form-control border-0 bg-transparent py-2" 
                placeholder="confirm-password" 
              />
              <span className="input-group-text border-0 bg-transparent cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                <i className={`fa ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'} text-muted`}></i>
              </span>
            </div>
            {errors.confirmPassword && <span className="text-danger small">{errors.confirmPassword.message}</span>}
          </div>
        </div>

        {/* --- 3. Footer Links --- */}
        <div className="text-end mt-3 mb-4">
          <Link to="/login" className="text-success text-decoration-none fw-bold">Login Now?</Link>
        </div>

        {/* --- 4. Submit Button --- */}
        <div className="text-center">
          <button type="submit" className="btn btn-success w-50 py-2 fw-bold rounded-3" style={{ backgroundColor: '#4CAF50', border: 'none' }}>
            Register
          </button>
        </div>
      </form>
    </div>
  )
}
