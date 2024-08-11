import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props){
    
    const [userData,setUserData] = useState(null)

    let saveUserData = ()=>{
        let encodedToken = localStorage.getItem('userToken');
        let decodedToken = jwtDecode(encodedToken); 
        setUserData(decodedToken);
    }

    useEffect(()=>{
        if(localStorage.getItem('userToken')){
            saveUserData()
        }
    },[])


    return (
    <AuthContext.Provider value={{userData,saveUserData}}>
        {props.children}
    </AuthContext.Provider>
    )
}