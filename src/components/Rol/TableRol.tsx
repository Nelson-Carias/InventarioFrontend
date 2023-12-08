import  { useEffect, useState } from "react";
import useRoleStore from "../../store/rol.store";
import CreateRol from "./CreateRol";
import NavMenu from "../Layout";
import UpdateRol from "./UpdateRol";
import { FaTrash } from "react-icons/fa";



export default function TableRol() {
  const {roles, OnGetRoles, OnDeleteRol} = useRoleStore();
  const [roleToDelete, setRoleToDelete] = useState<{id: number; roleName: string} | null>(null)
  
  useEffect(() =>{
    OnGetRoles("");
  }, [])

  const handleDelete = (id: number, roleName: string) => {
    setRoleToDelete({id, roleName});
  }

  const ConfirmDelete = () => {
    if (roleToDelete) {
      OnDeleteRol(roleToDelete.id);
      alert(`Se ha eliminado el rol`)
      setRoleToDelete(null);
    }
  }

  const cancelToDelete = () =>{
    setRoleToDelete(null);
  }

  const handleSearch = (name: string) =>{
    OnGetRoles(name)
}

  

  return (
    <>
    <NavMenu>
    <>
    <h5 className='flex justify-center text-2xl'>Lista de Roles</h5>
    <div>
      <CreateRol></CreateRol>
    </div>
   <div>
   <div className="flex justify-start p-5">
      <p>Buscar por nombre</p>
      <input placeholder="Escribe para buscar"
      type="text"
      onChange={(e) =>{
        handleSearch(e.target.value)
      }}/>
      
    </div>
   </div>
    <div className=" container mx-auto mt-3">
      <div className=" flex justify-center "></div>
      
      <table className="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead >
          <tr className="bg-[#186696] text-white font-semi-bold text-xl" >
            {/* <th scope="col" className="px-6 py-3">
              Id
            </th> */}
            <th scope="col" className="px-6 py-3">
              Rol
            </th>
            <th scope="col" className="px-6 py-3 flex justify-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 mt-10">
          {roles && roles.map((rol) => (
            <tr key={rol.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
              {/* <td className="px-6 py-4">{rol.id}</td> */}
              <td className="px-6 py-4">{rol.rol}</td>
              
                <td className="py-2 px-4 whitespace-nowrap align-top text-center">
                  
                  <div className="flex items-center justify-center space-x-5">
                    <UpdateRol roleId={rol.id} roleNameUpdate={rol.rol}></UpdateRol>
                    <button onClick={() => handleDelete(rol.id, rol.rol)} className="text-red-500" >
                       <FaTrash size={24}></FaTrash>
                    </button>

                    
                  </div>
                  
                  
                </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {roleToDelete && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p>¿Estas seguro que quieres eliminar el rol "{roleToDelete.roleName}"?</p>
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
    </NavMenu>
    </>
  );
}
