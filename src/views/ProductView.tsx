import TableProduct from "../components/Product/TableProduct";
import NavMenu from "../components/Layout";

export default function ProductView(){
    return(
        <>
            <NavMenu>
                <>
                  <TableProduct></TableProduct>  
                </>
            </NavMenu>
        </>
    )
}