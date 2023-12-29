import React, { useState } from 'react';
import useSaleStore from '../../store/sale.store';
import { FaPlus } from 'react-icons/fa';
import useCustomerStore from '../../store/customer.store';
import { ICreateSale } from '../../types/sale.types';



export default function CreateSale(){
//   const {customer, OnGetCustomer} = useCustomerStore();

//   React.useEffect(() => {
//     OnGetCustomer();
//   }, []);

//   const {OnCreateSale} = useSaleStore();
//   const[sale, setSale] = useState<ICreateSale>({
//     total: 0,
//     customerId: 0
//   });


//  // const { OnCreateSale} = useSaleStore();


//   const[saleTotal, setSaleTotal] = useState('');
//   const[saleCustomerID, setSaleCustomerId] = useState('');
//   const [showModal, setShowModal] = useState(false);

//   const closeModal = () => {
//     setShowModal(false)
//   }
         

//   const openModal = () => {
//       setShowModal(true);
//   }
//   const handleInputChangeTotal = (e: React.ChangeEvent<HTMLInputElement>) =>{
//     setSaleTotal(e.target.value)
//   }
//   // const handleInputChangeId = (e: React.ChangeEvent<HTMLInputElement>) =>{
    
//   //   setSaleCustomerId(e.target.value)
    
//   // }
 
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
//     const {name, value} = e.target;
//     setSale({
//         ...sale,
//         [name]: value,
//     })
//   }
//   // const handleSubmit = async () => {
//   //   if(saleCustomerID.trim()!== ''){
         
//   //     const customeId = parseInt(saleCustomerID, 10);
//   //     const total = parseInt(saleTotal, 10)
//   //     //setNewSupplierContact(e.target.value)
//   //     await OnCreateSale(customeId, total);
//   //     closeModal()
//   //   }
//   // }
//   const handleSubmit = async () => {
//     try {
//         await OnCreateSale(sale)
//         closeModal();
//     } catch (error) {
//         console.log("Error al crear el usuario:", error)
//     }
//   }

const {customer, OnGetCustomer} = useCustomerStore();
const [error, setError] = useState('');
React.useEffect(() => {
  OnGetCustomer("");
}, []);

const {OnCreateSale} = useSaleStore();
const[sale, setSale] = useState<ICreateSale>({
 total: 0,
 customerId: 0
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
  setSale({
      ...sale,
      [name]: value,
  })
}

const handleSubmit = async () => {
  try {
   
      await OnCreateSale(sale)
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
          <h3 className="text-lg font-medium mb-4 text-center">Añadir venta</h3>
          <form >
            <div className="mb-4">
              <input  type="number" name="total" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl mb-3" placeholder="total"/> 
              <select name="customerId" onChange={(e) => handleInputChange(e)} value={sale.customerId} className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 mt-5" >
                  <option value="">Selecciona un cliente</option>
                  {customer && customer.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                          {customer.name}
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      </div>
    )}
  </div>
);

  // return (
  //   <div className="bg-white p-2  opacity-100">
  //     <button onClick={openModal}  className="flex justify-center m-5  py-4 px-4   rounded-full bg-green-500 text-white">
  //       <FaPlus></FaPlus>
  //     </button>

  //     {showModal &&(
  //       <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
  //         <div className="bg-white rounded-lg shadow-lg p-6">
  //           <h3 className="text-lg font-medium mb-4 text-center">Añadir Venta</h3>
  //           <form >
  //             <div className="mb-4">
  //               <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Total:</label>
  //               <input  type="number" value={saleTotal} onChange={handleInputChangeTotal} className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese el total"/> 
  //             </div>

  //             <div className="mb-4">
  //               <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Cliente id:</label>
  //               <select name="customerId" onChange={(e) => handleInputChange(e)} value={sale.customerId} className="w-full border-gray-300 rounded-lg px-3 py-2 mb-4" >
  //                   <option value="" disabled>Selecciona un cliente</option>
  //                   {customer.map((customer) => (
  //                       <option key={customer.id} value={customer.id}>
  //                           {customer.name}
  //                       </option>
  //                   ))}
  //               </select>
  //             </div>



  //             <div className="flex justify-end">
  //               <button onClick={handleSubmit} className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md">
  //                 Guardar
  //               </button>
  //               <button onClick={closeModal} type="button" className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2">
  //                 Cancelar
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
}
    
