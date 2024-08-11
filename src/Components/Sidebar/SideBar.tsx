import React, { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import profileImg from "../../assets/images/profile.jfif"
import { AuthContext } from "../../Context/AuthContext";


export default function SideBar(){

  let {userData} =useContext(AuthContext)
    const [isCollapsed, setIsCollapsed] = useState(false);

    let toggleCollapse =()=>{
        setIsCollapsed(!isCollapsed)
    }
    return(
        <div className="sidebarContainer vh-100">   
<Sidebar collapsed={isCollapsed}>
  <Menu className="position-relative">
    {isCollapsed? 
   (<i onClick={toggleCollapse} className="fa fa-arrow-right px-5 position-absolute" aria-hidden="true"></i>):
    (<i onClick={toggleCollapse} className="fa fa-arrow-left px-5" aria-hidden="true"></i>)}

    
    <div className="text-center my-4">
    <img src={userData?.image} className="rounded-circle my-3" ></img>

{isCollapsed? 
   (<h6 onClick={toggleCollapse}>{userData?.firstName} {userData?.lastName}</h6>):
    (<h4 onClick={toggleCollapse}>{userData?.firstName} {userData?.lastName}</h4> )}

    </div>
  <MenuItem icon={<i className="fa fa-home"></i>} component={<Link to="/dashboard" />}> Home</MenuItem>
  <MenuItem icon={<i className="fa fa-users"></i>} component={<Link to="/dashboard/users" />}> Users</MenuItem>
  <MenuItem icon={<i className="fa fa-user"></i>} component={<Link to="/dashboard/userData" />}> User Data</MenuItem>
  <MenuItem icon={<i className="fa fa-user"></i>} component={<Link to="/dashboard/profile" />}> Profile</MenuItem>
  </Menu>
</Sidebar>
        </div>
    )
}