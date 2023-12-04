import React, { useState } from 'react';
import useSaleDetailStore from '../../store/saleDetail.store';
import { FaPlus } from 'react-icons/fa';
import useSaleStore from '../../store/sale.store';
//import useProductStore from '../../store/product.store';

import { ICreateSaleDetail } from '../../types/saleDetail.types';



export default function CreateSaleDetail(){


const {sale, OnGetSale} = useSaleStore();

React.useEffect(() => {
  OnGetSale();
}, []);

const {OnCreateSaleDetail} = useSaleDetailStore();
const[saleDetail, setSaleDetail] = useState<ICreateSaleDetail>({
 amount: 0,
 unitPrice: 0,
 saleId:0,
 productId: 0
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
  setSaleDetail({
      ...saleDetail,
      [name]: value,
  })
}

const handleSubmit = async () => {
  try {
      await OnCreateSaleDetail(saleDetail)
      closeModal();
  } catch (error) {
      console.log("Error al crear el venta:", error)
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
          <h3 className="text-lg font-medium mb-4 text-center">Añadir Detalle de venta</h3>
          <form >
            <div className="mb-4">
              <input  type="number" name="amount" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="cantidad"/> 
              <input  type="number" name="unitPrice" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="precioUnitario"/> 

              <select name="saleId" onChange={(e) => handleInputChange(e)} value={saleDetail.saleId} className="w-full border-gray-300 rounded-lg px-3 py-2 mb-4" >
                  <option value="">Selecciona un id Venta</option>
                  {sale && sale.map((sale) => (
                      <option key={sale.id} value={sale.id}>
                          {sale.id}
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
    
