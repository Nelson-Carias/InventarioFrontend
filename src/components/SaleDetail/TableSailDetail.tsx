
import  { useEffect, useState } from "react";
import useSaleDetailStore from "../../store/saleDetail.store";
import CreateSaleDetail from "./CreateSaleDetail";
import NavMenu from "../Layout";
import UpdateSaleDetail from "./UpdateSaleDetail";
//import UpdateSaleDetail from "./UpdateSaleDetail";
import { FaTrash } from "react-icons/fa";



export default function TableSaleDetail() {
  const {saleDetail, OnGetSaleDetail, OnDeleteSaleDetail} = useSaleDetailStore();
  const [saleDetailToDelete, setSaleDetailToDelete] = useState<{id: number; saleDetailAmount: number, saleDetailSaleId:number} | null>(null)
  
  useEffect(() =>{
    OnGetSaleDetail();
  }, [])

  const handleDelete = (id: number, saleDetailAmount: number, saleDetailSaleId:number) => {
    setSaleDetailToDelete({id, saleDetailAmount, saleDetailSaleId});
  }

  const ConfirmDelete = () => {
    if (saleDetailToDelete) {
      OnDeleteSaleDetail(saleDetailToDelete.id);
      alert(`Se ha eliminado el detalle de Venta`)
      setSaleDetailToDelete(null);
    }
  }

  const cancelToDelete = () =>{
    setSaleDetailToDelete(null);
  }


  

  return (
    <>
    <NavMenu>
    <>
    <h5 className='flex justify-center text-2xl'>Lista de detalle de Ventas</h5>
    <CreateSaleDetail></CreateSaleDetail>
    <div className=" container mx-auto mt-3">
      <div className=" flex justify-center "></div>
      
      <table className="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead >
          <tr className="bg-[#186696] text-white font-semi-bold text-xl" >
            {/* <th scope="col" className="px-6 py-3">
              Id
            </th> */}
            <th scope="col" className="px-6 py-3">
              Cantidad
            </th>
           
            <th scope="col" className="px-6 py-3">
              Precio Unitario 
            </th>
            <th scope="col" className="px-6 py-3">
              SubTotal
            </th>
           
            <th scope="col" className="px-6 py-3">
              Id de venta 
            </th> 
            <th scope="col" className="px-6 py-3">
              Id de Producto 
            </th> 
            <th scope="col" className="px-6 py-3 flex justify-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 mt-10">
          {saleDetail && saleDetail.map((saleDetail) => (
            <tr key={saleDetail.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
              {/* <td className="px-6 py-4">{rol.id}</td> */}
              <td className="px-6 py-4">{saleDetail.amount}</td>
              <td className="px-6 py-4">{saleDetail.unitPrice}</td>
              <td className="px-6 py-4">{saleDetail.subTotal}</td>

              <td className="px-6 py-4">{saleDetail.saleId}</td>
              <td className="px-6 py-4">{saleDetail.productId}</td>

              

              
                <td className="py-2 px-4 whitespace-nowrap align-top text-center">
                  
                  <div className="flex items-center justify-center space-x-5">
                    <UpdateSaleDetail id={saleDetail.id} newSaleDetailAmount={saleDetail.amount} newSaleDetailUnitPrice={saleDetail.unitPrice} newSaleDetailSaleId={saleDetail.saleId} newSaleDetailProductId={saleDetail.productId}></UpdateSaleDetail>
                    <button onClick={() => handleDelete(saleDetail.id, saleDetail.amount, saleDetail.saleId)} className="text-red-500" >
                       <FaTrash size={24}></FaTrash>
                    </button>

                    
                  </div>
                  
                  
                </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {saleDetailToDelete && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p>¿Estas seguro que quieres eliminar la venta "{saleDetailToDelete.saleDetailAmount} {saleDetailToDelete.saleDetailSaleId}"?</p>
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
