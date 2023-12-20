import React, { useState } from 'react';
import useCustomerStore from '../../store/customer.store';
import { FaPlus } from 'react-icons/fa';


export default function CreateCustomer(){
  const {OnCreateCustomer} = useCustomerStore();
  const[customerName, setCustomerName] = useState('');
  const[customerLastName, setCustomerLastName] = useState('');
  const[customerDirection, setCustomerDirection] = useState('');
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false)
  }
         

  const openModal = () => {
      setShowModal(true);
  }

  const handleInputChangeN = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setCustomerName(e.target.value)
    
  }
  const handleInputChangeC = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setCustomerLastName(e.target.value)
  }
  const handleInputChangeD = (e: React.ChangeEvent<HTMLInputElement>) =>{
    
    setCustomerDirection(e.target.value)
  }

  const handleSubmit = async () => {
    if(customerName.trim() !== ''){
      await OnCreateCustomer(customerName, customerLastName, customerDirection);
      closeModal()
    }
  }

  return (
    <div className="bg-white p-2  opacity-100">
      <button onClick={openModal}  className="flex justify-center m-5  py-4 px-4   rounded-full bg-green-500 text-white">
        <FaPlus></FaPlus>
      </button>

      {showModal &&(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-center">Añadir Cliente</h3>
            <form className='grid grid-cols-2'>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Nombre:</label>
                <input  type="text" value={customerName} onChange={handleInputChangeN} className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese el nombre"/> 
              </div>

              <div className="mb-4 ml-5">
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Apellido:</label>
                <input  type="text" value={customerLastName} onChange={handleInputChangeC} className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese el Apellido"/> 
              </div>


              <div className="mb-4 mt-5">
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Direcciòn:</label>
                <input  type="text" value={customerDirection} onChange={handleInputChangeD} className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese La Direccion"/> 
              </div>
              

              
            </form>
            <div className="flex justify-end">
                <button onClick={handleSubmit} className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md">
                  Guardar
                </button>
                <button onClick={closeModal} type="button" className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2">
                  Cancelar
                </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}
    
