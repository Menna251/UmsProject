import React, { useContext } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from './../../Context/AuthContext';

export default function Login(){
    let navigate =useNavigate()

    let {saveUserData}=useContext(AuthContext)
    

      let {
        register,
        handleSubmit,
        formState:{errors},
      }= useForm();

      let onSubmit = async (data) =>{
        try {
            let response = await axios.post("https://dummyjson.com/auth/login",data);
            localStorage.setItem("userToken",response.data.token);
            console.log(response)
            console.log(response.data)
            saveUserData()
            toast("login successfully")
            navigate("dashboard/home")
            console.log("ok")
            
        } catch (error) {
            
        }
      }
    return(
        <>
        <div className="login-container container-fluid">
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-md-4 bg-white rounder rounded-3 px-4 py-5">
                    <div>
                        <div className="title text-center">
                        <h4>User Management System</h4>
                        <h5 className="my-3">Sign In</h5>
                        <span className="text-muted ">Enter your credentials to access your account</span></div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="my-3">
                            <label className="text-muted">Email</label>
                            <input type="text" className="form-control" 
                                    placeholder="Enter rour email" aria-label="email"
                                      aria-describedby="basic-addon1" 
                                      {...register("username",{
                                        required: "userName is required"
                                      })}
                                      />
</div>
                                 {errors?.username && <span className="text-danger">{errors?.username?.message}</span>}
                        <div className="my-3">
                            <label className="text-muted">Password</label>
                                  <input type="text" className="form-control" 
                                  placeholder="Enter your password" aria-label="password"
                                     aria-describedby="basic-addon1" 
                                     {...register("password",{
                                        required:"password is required"
                                     })}
                                     />
</div>
{errors?.password && <span className="text-danger">{errors?.password?.message}</span>}
<button type="submit" className="btn btn-warning w-100 text-white">
                            SIGN IN
                          </button>
</form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}