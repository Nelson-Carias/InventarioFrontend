
import  { useEffect, useState } from "react";
import useSaleStore from "../../store/sale.store";
import CreateSale from "./CreateSale";
import NavMenu from "../Layout";
import UpdateSale from "./UpdateSale";
import { FaTrash } from "react-icons/fa";



export default function TableSale() {
  const {sale, OnGetSale, OnDeleteSale} = useSaleStore();
  const [saleToDelete, setSaleToDelete] = useState<{id: number; saleTotal: number, saleCustomerId:number} | null>(null)
  
  useEffect(() =>{
    OnGetSale();
  }, [])

  const handleDelete = (id: number, saleTotal: number, saleCustomerId:number) => {
    setSaleToDelete({id, saleTotal, saleCustomerId});
  }

  const ConfirmDelete = () => {
    if (saleToDelete) {
      OnDeleteSale(saleToDelete.id);
      alert(`Se ha eliminado la Venta`)
      setSaleToDelete(null);
    }
  }

  const cancelToDelete = () =>{
    setSaleToDelete(null);
  }


  

  return (
    <>
    <NavMenu>
    <>
    <h5 className='flex justify-center text-2xl'>Lista de Ventas</h5>
    <CreateSale></CreateSale>
    <div className=" container mx-auto mt-3">
      <div className=" flex justify-center "></div>
      
      <table className="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead >
          <tr className="bg-[#186696] text-white font-semi-bold text-xl" >
            {/* <th scope="col" className="px-6 py-3">
              Id
            </th> */}
            <th scope="col" className="px-6 py-3">
              Total
            </th>
           
            <th scope="col" className="px-6 py-3">
              Cliete 
            </th> 
            <th scope="col" className="px-6 py-3 flex justify-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 mt-10">
          {sale && sale.map((sale) => (
            <tr key={sale.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
              {/* <td className="px-6 py-4">{rol.id}</td> */}
              <td className="px-6 py-4">{sale.total}</td>
              <td className="px-6 py-4">{sale.customer.name}</td>
              
                <td className="py-2 px-4 whitespace-nowrap align-top text-center">
                  
                  <div className="flex items-center justify-center space-x-5">
                    <UpdateSale id={sale.id} newSaleTotal={sale.total} newSaleCustomerId={sale.customerId} ></UpdateSale>
                    <button onClick={() => handleDelete(sale.id, sale.total, sale.customerId)} className="text-red-500" >
                       <FaTrash size={24}></FaTrash>
                    </button>

                    
                  </div>
                  
                  
                </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {saleToDelete && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p>¿Estas seguro que quieres eliminar la venta "{saleToDelete.saleTotal} {saleToDelete.saleCustomerId}"?</p>
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
