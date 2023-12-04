
import NavMenu from "../components/Layout";
import TableUser from "../components/User/TableUser";

export default function UserView(){
    return(
        <>
            <NavMenu>
                <>
                  <TableUser></TableUser>  
                </>
            </NavMenu>
        </>
    )
}