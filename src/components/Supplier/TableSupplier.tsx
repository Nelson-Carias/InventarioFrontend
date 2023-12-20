

import  { useEffect, useState } from "react";
import useSupplierStore from "../../store/supplier.store";
import CreateSupplier from "./CreateSupplier";
import UpdateSupplier from "./UpdateSupplier";
import { FaTrash } from "react-icons/fa";



export default function TableSupplier() {
  const {supplier, OnGetSupplier, OnDeleteSupplier} = useSupplierStore();
  const [supplierToDelete, setSupplierToDelete] = useState<{id: number; supplierName: string, supplierContact:string, supplierDirection:string} | null>(null)
  
  useEffect(() =>{
    OnGetSupplier();
  }, [])

  const handleDelete = (id: number, supplierName: string, supplierContact:string, supplierDirection:string) => {
    setSupplierToDelete({id, supplierName, supplierContact, supplierDirection});
  }

  const ConfirmDelete = () => {
    if (supplierToDelete) {
      OnDeleteSupplier(supplierToDelete.id);
      alert(`Se ha eliminado el Proveedor`)
      setSupplierToDelete(null);
    }
  }

  const cancelToDelete = () =>{
    setSupplierToDelete(null);
  }


  

  return (
    <>
    <h5 className='flex justify-center text-2xl'>Lista de Proveedores</h5>
    <CreateSupplier></CreateSupplier>
    <div className=" container mx-auto mt-3">
      <div className=" flex justify-center "></div>
      
      <table className="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead >
          <tr className="bg-[#186696] text-white font-semi-bold text-xl" >
            {/* <th scope="col" className="px-6 py-3">
              Id
            </th> */}
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Contacto
            </th> <th scope="col" className="px-6 py-3">
              Direccion
            </th>
            <th scope="col" className="px-6 py-3 flex justify-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 mt-10">
          {supplier && supplier.map((supplier) => (
            <tr key={supplier.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
              {/* <td className="px-6 py-4">{rol.id}</td> */}
              <td className="px-6 py-4">{supplier.name}</td>
              <td className="px-6 py-4">{supplier.contact}</td>
              <td className="px-6 py-4">{supplier.direction}</td>
              
                <td className="py-2 px-4 whitespace-nowrap align-top text-center">
                  
                  <div className="flex items-center justify-center space-x-5">
                    <UpdateSupplier supplierId={supplier.id} supplierNameUpdate={supplier.name} supplierContact={supplier.contact} supplierDirection={supplier.direction}></UpdateSupplier>
                    <button onClick={() => handleDelete(supplier.id, supplier.name, supplier.contact, supplier.direction)} className="text-red-500" >
                       <FaTrash size={24}></FaTrash>
                    </button>

                    
                  </div>
                  
                  
                </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {supplierToDelete && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p>¿Estas seguro que quieres eliminar El Proveedor "{supplierToDelete.supplierName} "?</p>
          <div className="mt-4 flex justify-center">
            <button onClick={ConfirmDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                 eliminar
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
