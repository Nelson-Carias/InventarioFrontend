import React, { useState } from "react";
import useSaleStore from "../../store/sale.store";
import { FaRegEdit } from "react-icons/fa";
import useCustomerStore from '../../store/customer.store';


const UpdateSale = ({id, newSaleTotal, newSaleCustomerId,}: {id: number, newSaleTotal: number, newSaleCustomerId:number}) => {
  //   const [showModal, setShowModal] = useState(false);
  //   const [newSaleTotal, setNewSaleTotal] = useState(saleTotal);
  //   const [newSaleCustomerId, setNewSaleCustomerId] = useState(saleCustomerId);

  //   const {OnUpdateSale} = useSaleStore();
  //   const {customer, OnGetCustomer} = useCustomerStore();

  //   const closeModal = () => {
  //       setShowModal(false)
  //       setNewSaleTotal(saleTotal)
  //       setNewSaleCustomerId(saleCustomerId)

  //     }
             
    
  //   const openModal = () => {
  //       setShowModal(true)
  //   }

  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const inputTotal = e.target.value;
  //     const numericValue = parseInt(inputTotal, 10);
    
  //     if (!isNaN(numericValue)) {
  //       setNewSaleTotal(numericValue);
  //     } else {
  //       console.error("La entrada no es un número válido");
  //     }
       
  //   }
  //   const handleInputChangeCustomerId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const inputCustomerid = e.target.value;
  //     const numericValue = parseInt(inputCustomerid, 10);
    
  //     if (!isNaN(numericValue)) {
  //       setNewSaleCustomerId(numericValue);
  //     } else {
  //       console.error("La entrada no es un número válido");
  //     }
       

  // }
 

  //   const handleSubmit = async () => {
  //       if (newSaleTotal != null && newSaleCustomerId!= null){
          
  //           await OnUpdateSale(saleId, newSaleTotal, newSaleCustomerId);
  //           closeModal();
  //       }
  //   }
  const {customer, OnGetCustomer} = useCustomerStore();
  React.useEffect(() => {
      OnGetCustomer();
  }, [])

  const {OnUpdateSale} = useSaleStore();
  const [newTotal, setNewTotal] = useState(newSaleTotal);
  const [newCustomerId, setNewCustomerId] = useState(newSaleCustomerId);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
      setShowModal(true);
      
  }

  const closeModal = () => {
      setShowModal(false)
      setNewTotal(newSaleTotal);
      setNewCustomerId(newSaleCustomerId)
    
  }
           
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputContact = e.target.value;
     const numericValue = parseInt(inputContact, 10);
    
     setNewTotal(numericValue);
      
  }
    
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setNewCustomerId(Number(e.target.value))
  }

  const handleSubmit = async () => {
    if (newTotal != null){
        const updateSale = {
            id: id,
            total: newTotal,
            customerId: newCustomerId
           
        }

        await OnUpdateSale(id, updateSale);
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
                    <select name="customerId" onChange={(e) => handleSelectChange(e)} value={newCustomerId} className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4" >
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