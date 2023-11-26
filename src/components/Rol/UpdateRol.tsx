import React, { useState } from "react";
import useRoleStore from "../../store/rol.store";
import { FaRegEdit } from "react-icons/fa";


const UpdateRol = ({roleId, roleNameUpdate}: {roleId: number, roleNameUpdate: string}) => {
    const [showModal, setShowModal] = useState(false);
    const [newRoleName, setNewRoleName] = useState(roleNameUpdate);
    const {OnUpdateRol} = useRoleStore();

    const closeModal = () => {
        setShowModal(false)
        setNewRoleName(roleNameUpdate)
      }
             
    
    const openModal = () => {
        setShowModal(true)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRoleName(e.target.value)
    }

    const handleSubmit = async () => {
        if (newRoleName.trim() !== ''){
            await OnUpdateRol(roleId, newRoleName);
            closeModal();
        }
    }



    return (
        <div>
          
          <button onClick={openModal}  className="flex justify-center py-2 px-2 text-green-500">
            <FaRegEdit size={26}></FaRegEdit>
          </button>         
    
          {showModal &&(
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <span onClick={closeModal}></span>
                <h3 className="text-lg font-medium mb-4 text-center">Editar Rol</h3>
                <form >
                  <div className="mb-4">
                    <label htmlFor="rol" className="block text-gray-700 text-sm font-medium">Rol:</label>
                    <input type="text" value={newRoleName} onChange={handleInputChange}  className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese el rol"/> 
                  </div>
                  <div className="flex justify-end">
                    <button onClick={handleSubmit}  className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md">
                      Guardar
                    </button>
                    <button onClick={closeModal} type="button" className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2">
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        
        </div>
      );
}

export default UpdateRol