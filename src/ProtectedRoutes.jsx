import { Outlet } from "react-router-dom";
import HomePage from './pages/HomePage';

let Auth = localStorage.getItem(['role']);

let basiclevel = {
    "basic" : true,
    "admin" : true
}

let adminlevel = {
    "basic" : false,
    "admin" : true
}

const BasicRoutes = () => {

    return basiclevel[Auth] ? <Outlet /> : <HomePage />
}

const AdminRoutes = () => {
    return adminlevel[Auth] ? <Outlet /> : <HomePage />
}

export {BasicRoutes, AdminRoutes};