import TableSupplier from "../components/Supplier/TableSupplier";
import NavMenu from "../components/Layout";

export default function SupplierView(){
    return(
        <>
            <NavMenu>
                <>
                  <TableSupplier></TableSupplier>  
                </>
            </NavMenu>
        </>
    )
}