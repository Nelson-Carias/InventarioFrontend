import React, { useState } from "react";
import useSaleDetailStore from "../../store/saleDetail.store";
import { FaRegEdit } from "react-icons/fa";
import useSaleStore from '../../store/sale.store';


const UpdateSaleDetail = ({id, newSaleDetailAmount, newSaleDetailSaleId,}: {id: number, newSaleDetailAmount: number, newSaleDetailSaleId:number}) => {
 
  const {sale, OnGetSale} = useSaleStore();
  React.useEffect(() => {
      OnGetSale();
  }, [])

  const {OnUpdateSaleDetail} = useSaleDetailStore();
  const [newAmount, setNewAmount] = useState(newSaleDetailAmount);
  const [newSaleId, setNewSaleId] = useState(newSaleDetailSaleId);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
      setShowModal(true);
      
  }

  const closeModal = () => {
      setShowModal(false)
      setNewAmount(newSaleDetailAmount);
      setNewSaleId(newSaleDetailSaleId)
    
  }
           
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputContact = e.target.value;
     const numericValue = parseInt(inputContact, 10);
    
     setNewAmount(numericValue);
      
  }
    
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setNewSaleId(Number(e.target.value))
  }

  const handleSubmit = async () => {
    if (newAmount != null){
        const updateSaleDetail = {
            id: id,
            total: newSaleDetailAmount,
            customerId: newSaleId
           
        }

        await OnUpdateSaleDetail(id, updateSaleDetail);
        closeModal();
    }
};

    return (
        <div>
          
          <button onClick={openModal}  className="flex justify-center py-2 px-2 text-green-500">
            <FaRegEdit size={26}></FaRegEdit>
          </button>         
    
          {showModal &&(
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <span onClick={closeModal}></span>
                <h3 className="text-lg font-medium mb-4 text-center">Editar Venta</h3>
                <form >
                  <div className="mb-4">
                    <label htmlFor="total" className="block text-gray-700 text-sm font-medium">Total:</label>
                    <input type="number" value={newTotal} onChange={handleInputChange}  className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese la cantidad"/> 

                  </div>
                  <div className="mb-4">
                    <label htmlFor="customerId" className="block text-gray-700 text-sm font-medium">Cliente:</label>
                    <select name="customerId" onChange={(e) => handleSelectChange(e)} value={newCustomerId} className="w-full border-gray-300 rounded-lg px-3 py-2 mb-4" >
                  <option value="">Selecciona un cliente</option>
                  {customer && customer.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                          {customer.name}
                      </option>
                  ))}
              </select>
                  </div>
                 
                  <div className="flex justify-end">
                    <button onClick={handleSubmit}  className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md">
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

export default UpdateSale