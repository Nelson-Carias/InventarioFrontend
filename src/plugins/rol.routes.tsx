import { Routes, Route, BrowserRouter } from "react-router-dom";
import RolePage from "../components/Rol/TableRol"
import HomeView from "../views/HomeView"
import SupplierView from "../views/SupplierView";
// import ProductView from "../views/ProductView"

function RolRoutes(){
    return(
        <BrowserRouter>
            <Routes>

                <Route path="/rol" element={<RolePage></RolePage>}></Route>
                <Route path="/" element={<HomeView></HomeView>}></Route>
                <Route path="/supplier" element={<SupplierView></SupplierView>}></Route>
                {/* <Route path="/product" element={<ProductView></ProductView>}></Route> */}
            </Routes>
         </BrowserRouter>
    )
    
}

export default RolRoutes