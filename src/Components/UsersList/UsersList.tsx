import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";


export default function UsersList(){
  let navigate = useNavigate()
    const [users,setUsers] = useState([]);

    

    const [show, setShow] = useState(false);

    const [userId,setUserId] = useState(0)

    const [userData,setUserData] = useState(null)

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setShow(true)
    setUserId(user.id)
    setUserData(user)
  
  }
  

        
        let getUsers =async ()=>{
            try{
                let response =await axios.get("https://dummyjson.com/users")
                setUsers(response.data.users)
            }catch(error){
                console.log(error)
            };        
          }


          let navigateToUserData =()=>{
            navigate("/dashboard/UserData")
          }
        const editUser =(userId)=>{ navigate (`/dashboard/UserData/${userId}`)}
        
        let deleteUser = async () =>{
          try {
            
            let response = await  axios.delete(`https://dummyjson.com/users/${userId}`)
            console.log(response);
            toast.success("delete successfully")
            handleClose()
          } catch (error) {
            console.log(error)
          }
        }


        useEffect(()=>{
            getUsers()
        },[])
    
    return(
        <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Are You Sure You Want To Delete {userData?.firstName}{" "} {userData?.lastName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteUser}>
            Yes
          </Button>
          <Button variant="warning" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
        <div className="title p-3 d-flex justify-content-between">
            <h3>Users List</h3>
            <button className="btn btn-warning" onClick={navigateToUserData}>Add New User</button>
        </div>
        <hr />
        <div className="p-3">
        <table className="table">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">birthDate</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {users.map((user:any)=>
    <tr key={user.id}>
      <th scope="row">
        <img className="w-25" src={user.image}></img>
      </th>
      <td>{user.firstName} {user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.birthDate}</td>
      <td>
        <i onClick={()=>editUser(user.id)}className="fa fa-edit text-warning mx-3" aria-hidden="true"></i>
        <i onClick={()=>handleShow(user)} className="fa fa-trash text-warning " aria-hidden="true"></i>
      </td>
    </tr>)}
  </tbody>
</table>
        </div>
        </>
    )
}