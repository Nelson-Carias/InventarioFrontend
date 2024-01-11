import { Routes, Route, BrowserRouter, Outlet, Navigate } from "react-router-dom";
import HomeView from "../views/HomeView"
import SupplierView from "../views/SupplierView";
import CustomerView from "../views/CustomerView";

import ProductView from "../views/ProductView"

import UserView from "../views/UserView"
import SalePage from "../components/Sale/TableSale"
import SaleDetail from "../components/SaleDetail/TableSailDetail"
import Login from "../components/Login/Login"
import { isAuthenticated } from "../utils/local_data";
import RolView from "../views/RolView";


const PrivateRoutes = () => {
    return isAuthenticated() ? <Outlet/> : <Navigate to="/" replace />
}

function RolRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoutes/>}>
                <Route path="/rol" element={<RolView></RolView>}></Route>
                <Route path="/home" element={<HomeView></HomeView>}></Route>
                <Route path="/supplier" element={<SupplierView></SupplierView>}></Route>
                <Route path="/customer" element={<CustomerView></CustomerView>}></Route>
                <Route path="/product" element={<ProductView></ProductView>}></Route>
                <Route path="/user" element={<UserView></UserView>}></Route>
                <Route path="/sale" element={<SalePage></SalePage>}></Route>
                <Route path="/saleDetail" element={<SaleDetail></SaleDetail>}></Route>
                </Route>
                <Route path="/" element={<Login/>}></Route>
            </Routes>
         </BrowserRouter>
    )
    
}

export default RolRoutes