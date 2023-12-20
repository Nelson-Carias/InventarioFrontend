import React, { useState } from 'react';
import useUserStore from '../../store/user.store';
import useRoleStore from '../../store/rol.store';
import { FaPlus } from 'react-icons/fa';
import { ICreateUser } from '../../types/user.types';


export default function CreateUSer(){

  const {roles, OnGetRoles} = useRoleStore();

  React.useEffect(() => {
    OnGetRoles("");
  }, []);

  const {OnCreateUser} = useUserStore();
  const[user, setUser] = useState<ICreateUser>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    rolId: 0,
  });
  
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false)
  }
         

  const openModal = () => {
      setShowModal(true);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
    const {name, value} = e.target;
    setUser({
        ...user,
        [name]: value,
    })
  }

  const handleSubmit = async () => {
    try {
        await OnCreateUser(user)
        closeModal();
    } catch (error) {
        console.log("Error al crear el usuario:", error)
    }
  }

  return (
    <div className="bg-white p-2  opacity-100">
      <button onClick={openModal}  className="flex justify-center  py-4 px-4   rounded-full bg-blue-500 text-white">
        <FaPlus></FaPlus>
      </button>
      <br></br>

      {showModal &&(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-center">Añadir Usuario</h3>
            <form >
              <div className="mb-4 grid grid-cols-2">
                <div>
                  <label htmlFor="user" className="block text-gray-700 text-sm font-medium">Nombre:</label>
                  <input  type="text" name="name" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="Nombres del usuario"/> 

                </div>
                <div className='ml-5'>
                  <label>Apellido</label>
                  <input  type="text" name="lastName" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="Apellidos del usuario"/> 

                </div>
                <div className='mt-4'>
                  <label>Email</label>
                  <input  type="text" name="email" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="Email del usuario"/> 

                </div>

                <div className='ml-5 mt-4'>
                  <label>Password</label>
                  <input  type="text" name="password" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="Password del usuario"/> 

                </div>
                  <label>Rol</label>
                <div>

                </div>
                <select name="rolId" onChange={(e) => handleInputChange(e)} value={user.rolId} className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4" >
                    <option value="" >Selecciona un rol</option>
                    {roles.map((rol) => (
                        <option key={rol.id} value={rol.id}>
                            {rol.rol}
                        </option>
                    ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button onClick={handleSubmit} className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md">
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