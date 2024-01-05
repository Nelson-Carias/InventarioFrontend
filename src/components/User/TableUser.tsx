import  { useEffect, useState } from "react";
import useUserStore from "../../store/user.store";
import CreateUser from "./CreateUser";

import UpdateUser from "./UpdateUser";
import { FaTrash } from "react-icons/fa";



export default function TableUser() {
  const {users, OnGetUsers, OnDeleteUser} = useUserStore();
  const [userToDelete, setUserToDelete] = useState<{id: number; userEmail: string} | null>(null)
  
  useEffect(() =>{
    OnGetUsers();
  }, [])

  const handleDelete = (id: number, userEmail: string) => {
    setUserToDelete({id, userEmail});
  }

  const ConfirmDelete = () => {
    if (userToDelete) {
      OnDeleteUser(userToDelete.id);
      alert(`Se ha eliminado el Usuario`)
      setUserToDelete(null);
    }
  }

  const cancelToDelete = () =>{
    setUserToDelete(null);
  }


  

  return (
    
    <>
    <h5 className='flex justify-center text-2xl'>Lista de Usuarios</h5>
    <CreateUser></CreateUser>
    <div className=" container mx-auto mt-3 ">
      <div className=" flex justify-center "></div>
      
      <table className="w-full rounded-lg text-sm text-left rtl:text-right text-gray-700">
        <thead className="rounded-lg">
          <tr  className="bg-[#CCCCFF] text-black font-semi-bold text-xl " >
            {/* <th scope="col" className="px-6 py-3">
              Id
            </th> */}
            <th scope="col" className="px-6 py-3">
              Nombres
            </th>
            <th scope="col" className="px-6 py-3">
              Apellidos
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Rol
            </th>
            <th scope="col" className="px-6 py-3 flex justify-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 mt-10">
          {users && users.map((user) => (
            <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
              {/* <td className="px-6 py-4">{rol.id}</td> */}
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.lastName}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.rol.rol}</td>
              
                <td className="py-2 px-4 whitespace-nowrap align-top text-center">
                  
                  <div className="flex items-center justify-center space-x-5">
                    <UpdateUser id={user.id} newNameUser={user.name} newLastNameUser={user.lastName} newEmailUser={user.email} newRolId={user.rolId}></UpdateUser>
                    <button onClick={() => handleDelete(user.id, user.name)} className="text-red-500" >
                       <FaTrash size={24}></FaTrash>
                    </button>
                    
                  </div>
                    
                  
                </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {userToDelete && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className=" bg-white p-4 rounded-lg shadow-lg">
          <p>¿Estas seguro que quieres eliminar el usuario "{userToDelete.userEmail}"?</p>
          <div className="mt-4 flex justify-center">
            <button onClick={ConfirmDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                Si eliminar
            </button>
            <button onClick={cancelToDelete} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full ml-4">
                Cancelar
            </button>

          </div>

        </div>

      </div>
    )}

  </>
  );
}
