import React, { useState } from "react";
import useSupplierStore from "../../store/supplier.store";
import { FaRegEdit } from "react-icons/fa";


const UpdateSupplier = ({supplierId, supplierNameUpdate, supplierContact, supplierDirection}: {supplierId: number, supplierNameUpdate: string, supplierContact:string, supplierDirection:string}) => {
    const [showModal, setShowModal] = useState(false);
    const [newSupplierName, setNewSupplierName] = useState(supplierNameUpdate);
    const [newSupplierContact, setNewSupplierContact] = useState(supplierContact);
    const [newSupplierDirection, setNewSupplierDirection] = useState(supplierDirection);
    const [error, setError] = useState('');
    const {OnUpdateSupplier} = useSupplierStore();

    const closeModal = () => {
        setShowModal(false)
        setNewSupplierName(supplierNameUpdate)
        setNewSupplierContact(supplierContact)
        setNewSupplierDirection(supplierDirection)

      }
             
    
    const openModal = () => {
        setShowModal(true)
    }

    const handleInputChangeN = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSupplierName(e.target.value)
       
    }
    const handleInputChangeC = (e: React.ChangeEvent<HTMLInputElement>) => {
      // const inputContact = e.target.value;
      // const numericValue = parseInt(inputContact, 10);
    
      // if (!isNaN(numericValue)) {
      //   setNewSupplierContact(numericValue);
      // } else {
      //   console.error("La entrada no es un número válido");
      // }
     
     
      //setNewSupplierContact(e.target.value)
      setNewSupplierContact(e.target.value)

  }
  const handleInputChangeD = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSupplierDirection(e.target.value)
}

    const handleSubmit = async () => {
      if(newSupplierName.trim() !== '' && newSupplierContact.trim()!=='' && newSupplierDirection.trim()!==''){
        await OnUpdateSupplier(supplierId, newSupplierName, newSupplierContact, newSupplierDirection);
        closeModal()
      }else{
        setError('Revise que no queden campos vacios');
  
        console.log("nel perro")
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
                <h3 className="text-lg font-medium mb-4 text-center">Editar Supplier</h3>
                <form className="grid grid-cols-2">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Nombre:</label>
                    <input type="text" value={newSupplierName} onChange={handleInputChangeN}  className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese el nombre"/> 

                  </div>
                  <div className="mb-4 ml-5">
                    <label htmlFor="contact" className="block text-gray-700 text-sm font-medium">Contacto:</label>
                    <input type="number" value={newSupplierContact} onChange={handleInputChangeC}  className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese el contacto"/> 

                  </div>
                  <div className="mb-4">
                    <label htmlFor="direction" className="block text-gray-700 text-sm font-medium">Direccion:</label>
                    <input type="text" value={newSupplierDirection} onChange={handleInputChangeD}  className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese la direccioin"/> 

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

export default UpdateSupplier