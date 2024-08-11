import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function Navbar(){

   //let userData= useContext(AuthContext)
   let {userData} = useContext(AuthContext)
   if(userData){
    console.log(userData)
    console.log(userData.username)
   }
    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">UMS</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active text-dark" aria-current="page" href="#">{userData?.firstName} {userData?.lastName}</a>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
        </>
    )
}