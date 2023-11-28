import React, { useState } from 'react';
import useSupplierStore from '../../store/supplier.store';
import { FaPlus } from 'react-icons/fa';


export default function CreateSupplier(){
  const {OnCreateSupplier} = useSupplierStore();
  const[supplierName, setSupplierName] = useState('');
  const[supplierContact, setSupplierContact] = useState('');
  const[supplierDirection, setSupplierDirection] = useState('');
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false)
  }
         

  const openModal = () => {
      setShowModal(true);
  }

  const handleInputChangeN = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSupplierName(e.target.value)
    
  }
  const handleInputChangeC = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSupplierContact(e.target.value)
  }
  const handleInputChangeD = (e: React.ChangeEvent<HTMLInputElement>) =>{
    
    setSupplierDirection(e.target.value)
  }

  const handleSubmit = async () => {
    if(supplierName.trim() !== ''){
      await OnCreateSupplier(supplierName, supplierContact, supplierDirection);
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
            <h3 className="text-lg font-medium mb-4 text-center">Añadir Proveedor</h3>
            <form >
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Nombre:</label>
                <input  type="text" value={supplierName} onChange={handleInputChangeN} className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese el nombre"/> 
              </div>

              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Numero de Contacto:</label>
                <input  type="text" value={supplierContact} onChange={handleInputChangeC} className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese el Contacto"/> 
              </div>


              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Direcciòn:</label>
                <input  type="text" value={supplierDirection} onChange={handleInputChangeD} className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese La Direccion"/> 
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
    
