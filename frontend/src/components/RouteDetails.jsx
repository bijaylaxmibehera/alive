import { Route, Routes } from "react-router"
import { Home } from "../pages/Home"
import { RoleSelection } from "../pages/RoleSelection"
import { RegisterUser } from "../pages/RegisterUser"
import { Login } from "../pages/Login"
import { RegisterAdmin } from "../pages/RegisterAdmin"

export const RouteDetails=()=>{
    return (
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/select-role" element={<RoleSelection/>}/>
            <Route path="/register/user" element={<RegisterUser/>}/>
            <Route path="/register/admin" element={<RegisterAdmin/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
        </>
    )
}