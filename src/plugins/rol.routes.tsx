import { Routes, Route, BrowserRouter } from "react-router-dom";
import RolePage from "../components/Rol/TableRol"
import HomeView from "../views/HomeView"
import SupplierView from "../views/SupplierView";
import CustomerPage from "../components/Customer/TableCostumer"

import ProductView from "../views/ProductView"

import UserView from "../views/UserView"
import SalePage from "../components/Sale/TableSale"
import SaleDetail from "../components/SaleDetail/TableSailDetail"
import Login from "../components/Login/Login"

function RolRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/rol" element={<RolePage></RolePage>}></Route>
                <Route path="/home" element={<HomeView></HomeView>}></Route>
                <Route path="/supplier" element={<SupplierView></SupplierView>}></Route>
                <Route path="/customer" element={<CustomerPage></CustomerPage>}></Route>
                <Route path="/product" element={<ProductView></ProductView>}></Route>
                <Route path="/user" element={<UserView></UserView>}></Route>
                <Route path="/sale" element={<SalePage></SalePage>}></Route>
                <Route path="/saleDetail" element={<SaleDetail></SaleDetail>}></Route>
            </Routes>
         </BrowserRouter>
    )
    
}

export default RolRoutes