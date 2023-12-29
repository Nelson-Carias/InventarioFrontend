
import  { useEffect, useState } from "react";
import useCustomerStore from "../../store/customer.store";
import CreateCustomer from "./CreateCustomer";
import NavMenu from "../Layout";
import UpdateCustomer from "./UpdateCustomer";
import { FaTrash } from "react-icons/fa";



export default function TableCustomer() {
  const {customer, OnGetCustomer, OnDeleteCustomer} = useCustomerStore();
  const [customerToDelete, setCustomerToDelete] = useState<{id: number; customerName: string, customerLastName:string, customerDirection:string} | null>(null)
  
  useEffect(() =>{
    OnGetCustomer("");
  }, [])

  const handleDelete = (id: number, customerName: string, customerLastName:string, customerDirection:string) => {
    setCustomerToDelete({id, customerName, customerLastName, customerDirection
    });
  }

  const ConfirmDelete = () => {
    if (customerToDelete) {
      OnDeleteCustomer(customerToDelete.id);
      alert(`Se ha eliminado el Cliente`)
      setCustomerToDelete(null);
    }
  }

  const cancelToDelete = () =>{
    setCustomerToDelete(null);
  }

  const handleSearch = (name: string) =>{
    OnGetCustomer(name)
}
  

  return (
    <>
    <NavMenu>
    <>
    <h5 className='flex justify-center text-2xl'>Lista de Clientes</h5>
    
    <CreateCustomer></CreateCustomer>
    
    <div className=" container mx-auto mt-3">
      
      <div className=" flex justify-center "></div>
      <div className="flex justify-start p-5">
      <p>Buscar por nombre</p>
      <input placeholder="Escribe para buscar"
      type="text"
      onChange={(e) =>{
        handleSearch(e.target.value)
      }}/>
      
    </div>
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
              Apellido
            </th> <th scope="col" className="px-6 py-3">
              Direccion
            </th>
            <th scope="col" className="px-6 py-3 flex justify-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 mt-10">
          {customer && customer.map((customer) => (
            <tr key={customer.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
              {/* <td className="px-6 py-4">{rol.id}</td> */}
              <td className="px-6 py-4">{customer.name}</td>
              <td className="px-6 py-4">{customer.lastName}</td>
              <td className="px-6 py-4">{customer.direction}</td>
              
                <td className="py-2 px-4 whitespace-nowrap align-top text-center">
                  
                  <div className="flex items-center justify-center space-x-5">
                    <UpdateCustomer customerId={customer.id} customerNameUpdate={customer.name} customerLastName={customer.lastName} customerDirection={customer.direction}></UpdateCustomer>
                    <button onClick={() => handleDelete(customer.id, customer.name, customer.lastName, customer.direction)} className="text-red-500" >
                       <FaTrash size={24}></FaTrash>
                    </button>

                    
                  </div>
                  
                  
                </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {customerToDelete && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p>¿Estas seguro que quieres eliminar el Cliente "{customerToDelete.customerName} "?</p>
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
    </NavMenu>
    </>
  );
}
