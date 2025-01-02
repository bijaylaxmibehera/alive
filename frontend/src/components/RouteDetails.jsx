import { Route, Routes } from "react-router"
import { Home } from "../pages/Home"
import { RoleSelection } from "../pages/RoleSelection"
import { RegisterUser } from "../pages/RegisterUser"
import { Login } from "../pages/Login"
import { RegisterAdmin } from "../pages/RegisterAdmin"
import EventList from "../pages/EventList"
import CreateEvent from "../features/admin/CreateEvent"
import { Dashboard } from "../features/admin/Dashboard"
import EventDetailsPage from "../pages/EventDetails"

export const RouteDetails=()=>{
    return (
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/events" element={<EventList/>}/>
            <Route path="/event-details/:eventId" element={<EventDetailsPage/>}/>
            <Route path="/select-role" element={<RoleSelection/>}/>
            <Route path="/register/user" element={<RegisterUser/>}/>
            <Route path="/register/admin" element={<RegisterAdmin/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/:name/create-event" element={<CreateEvent/>}/>
            <Route path="/:name/dashboard" element={<Dashboard/>}/>
        </Routes>
        </>
    )
}