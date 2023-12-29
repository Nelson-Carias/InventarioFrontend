import React, { useState } from "react";
import useCustomerStore from "../../store/customer.store";
import { FaRegEdit } from "react-icons/fa";


const UpdateCustomer = ({customerId, customerNameUpdate, customerLastName, customerDirection}: {customerId: number, customerNameUpdate: string, customerLastName:string, customerDirection:string}) => {
    const [showModal, setShowModal] = useState(false);
    const [newCustomerName, setNewCustomerName] = useState(customerNameUpdate);
    const [newCustomerLastName, setNewCustomerLastName] = useState(customerLastName);
    const [newCustomerDirection, setNewCustomerDirection] = useState(customerDirection);
    const [error, setError] = useState('');
    const {OnUpdateCustomer} = useCustomerStore();

    const closeModal = () => {
        setShowModal(false)
        setNewCustomerName(customerNameUpdate)
        setNewCustomerLastName(customerLastName)
        setNewCustomerDirection(customerDirection)

      }
             
    
    const openModal = () => {
        setShowModal(true)
    }

    const handleInputChangeN = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCustomerName(e.target.value)
       
    }
    const handleInputChangeC = (e: React.ChangeEvent<HTMLInputElement>) => {
     
      setNewCustomerLastName(e.target.value)

  }
  const handleInputChangeD = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCustomerDirection(e.target.value)
}

    const handleSubmit = async () => {
      if(newCustomerName.trim() !== '' && newCustomerLastName.trim() !== '' && newCustomerDirection.trim() !== ''){
        await OnUpdateCustomer(customerId, newCustomerName, newCustomerLastName, newCustomerDirection);
        closeModal()
      }else{
        setError('Revise que no queden campos vacios');
  
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
                <h3 className="text-lg font-medium mb-4 text-center">Editar Cliente</h3>
                <form className="grid grid-cols-2">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Nombre:</label>
                    <input type="text" value={newCustomerName} onChange={handleInputChangeN}  className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese el nombre"/> 

                  </div>
                  <div className=" ml-5">
                    <label htmlFor="lastname" className="block text-gray-700 text-sm font-medium">Apellido:</label>
                    <input type="string" value={newCustomerLastName} onChange={handleInputChangeC}  className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese el Apellido"/> 

                  </div>
                  <div className="mb-4 mt-2">
                    <label htmlFor="direction" className="block text-gray-700 text-sm font-medium">Direccion:</label>
                    <input type="text" value={newCustomerDirection} onChange={handleInputChangeD}  className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese la direccioin"/> 

                  </div>
                  
                </form>
                <div className="flex justify-end">
                    <button onClick={handleSubmit}  className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md">
                      Guardar
                    </button>
                    <button onClick={closeModal} type="button" className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2">
                      Cancelar
                    </button>
                  </div>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
            </div>
          )}
        
        </div>
      );
}

export default UpdateCustomer