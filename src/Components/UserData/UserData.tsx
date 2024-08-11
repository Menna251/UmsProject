import axios from "axios";
import React ,{useEffect,useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import userData from './UserData';

export default function UserData(){
    const {register, handleSubmit,setValue, 
        formState:{errors}} = useForm()
        const navigate = useNavigate()
       const{ userId }= useParams()
        const[isUpdate, setIsUpdate]= useState(false)
        

        useEffect(()=>{
           if(userId){
             setIsUpdate(true)
              axios.get(`https://dummyjson.com/users/${userId}`).then(response =>{
                  const userData = response.data
                    
                    
                  setValue('firstName',userData.firstName)
                    setValue('lastName',userData.lastName)
                    setValue('email',userData.email)
                    setValue('age',userData.age)
                    setValue('phone',userData.phone)
                    setValue('birthDate',userData.birthDate)
                })
                .catch(error => console.log(error))
            }
        },[userId,setValue])

        const onSubmit = async (data) =>{
            try{
               if(isUpdate){
                   await axios.put(`https://dummyjson.com/users/${userId}`,data)
                   toast("update Success")
                }
                else{
                   await axios.post('https://dummyjson.com/users/add',data)
                    toast("Add Success")
                }
                navigate('/dashboard/users')
            }catch(error){
                console.log(error)
           }
        }
    


    return(
        <>
        
        <div className="title p-3">
        <h3>{isUpdate ? 'Update User': 'Add User'}</h3>
        </div>
        <hr />
        <form className="shadow-sm m-5 p-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6">
                    
                <div className="my-3">
                            <label className="text-muted">First Name</label>
                            <input type="text" className="form-control" 
                                    placeholder="Enter Your First Name" aria-label="first name"
                                      aria-describedby="basic-addon1" 
                                      {...register('firstName',{required:'First Name Is Required'})}/>
                         </div>
                         {errors.firstName&&<span className="text-danger">{errors.firstName.message}</span>}
                </div>
                <div className="col-md-6">
                    
                <div className="my-3">
                            <label className="text-muted">Last Name</label>
                            <input type="text" className="form-control" 
                                    placeholder="Enter Your Last Name" aria-label="last name"
                                      aria-describedby="basic-addon1" 
                                      {...register('lastName',{required:'last Name Is Required'})}/>
                         </div>
                         {errors.lastName&&<span className="text-danger">{errors.lastName.message}</span>}
                </div>
            </div>

            
            <div className="row">
                <div className="col-md-6">
                    
                <div className="my-3">
                            <label className="text-muted">Email</label>
                            <input type="text" className="form-control" 
                                    placeholder="Enter Your Email" aria-label="email"
                                      aria-describedby="basic-addon1"
                                      {...register('email',
                                        {required:'Email Is Required',
                                        pattern:{
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message:'Email should be valid'},
                                      })} />
                         </div>
                         {errors.email&&<span className="text-danger">{errors.email.message}</span>}
                </div>
                <div className="col-md-6">
                    
                <div className="my-3">
                            <label className="text-muted">Age</label>
                            <input type="number" className="form-control" 
                                    placeholder="Enter Your Age" aria-label="age"
                                      aria-describedby="basic-addon1" 
                                      {...register('age',{required:'Age Is Required' , max:{value:50,message:"max age is 50"}})}/>
                         </div>
                         {errors.age&&<span className="text-danger">{errors.age.message}</span>}
                </div>
            </div>

            
            <div className="row">
                <div className="col-md-6">
                    
                <div className="my-3">
                            <label className="text-muted">Phone Number</label>
                            <input type="text" className="form-control" 
                                    placeholder="Enter Your Phone Number" aria-label="phone"
                                      aria-describedby="basic-addon1" 
                                      {...register('phone',{required:'Phone Is Required',
                                        pattern:{
                                            value:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                                            message:'Phone Number should be valid'
                                        }
                                      })}/>
                         </div>
                         {errors.phone&&<span className="text-danger">{errors.phone.message}</span>}
                </div>
                <div className="col-md-6">
                    
                <div className="my-3">
                            <label className="text-muted">Birth Date</label>
                            <input type={isUpdate ? 'text': 'date'} className="form-control" 
                                    placeholder="Enter Your Birth Date" aria-label="birthDate"
                                      aria-describedby="basic-addon1"  
                                      {...register('birthDate',{required:'birth Date Is Required'})}/>
                         </div>
                         {errors.birthDate&&<span className="text-danger">{errors.birthDate.message}</span>}
                </div>
            </div>
            <div className="text-center my-5">
            <button className="btn btn-warning w-50 " type="submit">{isUpdate ? 'Update': 'Save'}</button></div>

        </form>
        </>
    )
}