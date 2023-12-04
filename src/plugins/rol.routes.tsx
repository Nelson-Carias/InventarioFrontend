import { Routes, Route, BrowserRouter } from "react-router-dom";
import RolePage from "../components/Rol/TableRol"
import HomeView from "../views/HomeView"
import SupplierPage from "../components/Supplier/TableSupplier";
import CustomerPage from "../components/Customer/TableCostumer"

import ProductView from "../views/ProductView"

import UserView from "../views/UserView"
import SalePage from "../components/Sale/TableSale"
import Login from "../components/Login/Login"

function RolRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/rol" element={<RolePage></RolePage>}></Route>
                <Route path="/home" element={<HomeView></HomeView>}></Route>
                <Route path="/supplier" element={<SupplierPage></SupplierPage>}></Route>
                <Route path="/customer" element={<CustomerPage></CustomerPage>}></Route>
                <Route path="/product" element={<ProductView></ProductView>}></Route>
                <Route path="/user" element={<UserView></UserView>}></Route>
                <Route path="/sale" element={<SalePage></SalePage>}></Route>
            </Routes>
         </BrowserRouter>
    )
    
}

export default RolRoutes