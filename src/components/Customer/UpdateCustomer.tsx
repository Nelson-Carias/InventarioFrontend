import React, { useState } from "react";
import {useCustomerStore} from "../../store/customer.store";
import { FaRegEdit } from "react-icons/fa";

import * as yup from "yup";
import { useFormik } from "formik";


interface UpdateCustomerProps {
  id: number;
  customer: {
    id: number;
    name: string;
    lastName: string;
    direction: string;
  };
}



const UpdateCustomer: React.FC<UpdateCustomerProps> = ({ customer }) => {
  const [showModal, setShowModal] = useState(false);
  const statusOfCustomer = useCustomerStore();
  const resetFormik = () => {
    formik.resetForm();
  };
  const closeModal = () => {
    setShowModal(false);
    resetFormik();
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setNewRoleName(e.target.value)
  // }

  // const handleSubmit = async () => {
  //     if (newRoleName.trim() !== ''){
  //         await OnUpdateRol(roleId, newRoleName);
  //         closeModal();
  //     }
  // }

  const validationSchema = yup.object({
    name: yup.string().required("*El campo es requerido"),
    lastName: yup.string().required("*Contacto es requerido"),
    direction: yup.string().required("*Dirección es requerida"),

  });

  const openModal = () => {
    setShowModal(true);
  };
  const formik = useFormik({
    initialValues: {
      name: customer.name,
      lastName: customer.lastName,
      direction: customer.direction

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const customerPayload = {
        name: values.name,
        lastName: values.lastName,
        direction: values.direction
      };
      await statusOfCustomer.OnUpdateCustomer(customer.id, customerPayload);
      closeModal();
      window.location.reload();
    },
  });

  return (
    <div>
      <div className="icon-container">
        <button
          onClick={openModal}
          data-tooltip-target="tooltip-default"
          type="button"
          className=""
        >
          <FaRegEdit size={24} className="text-[#22CCEE]" color="" />
        </button>
        <div id="tooltip-default" role="tooltip" className="popup-message">
          Editar
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <span onClick={closeModal}></span>
            <h3 className="text-lg font-medium mb-4 text-center">
              Modificar Cliente
            </h3>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-2">
           
                <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Nombre:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=""
                  className="text-sm text-gray-600 mt-1 p-3 w-full border rounded-md"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              <div className="mb-4 ml-5">
                <label
                  htmlFor="contact"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Apellido:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=""
                  className="text-sm text-gray-600 mt-1 p-3 w-full border rounded-md"
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.lastName}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="supplier"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Direction:
                </label>
                <input
                  type="text"
                  id="direction"
                  name="direction"
                  value={formik.values.direction}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=""
                  className="text-sm text-gray-600 mt-1 p-3 w-full border rounded-md"
                />
                {formik.touched.direction && formik.errors.direction && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.direction}
                  </div>
                )}
              </div>




                  <div className="mt-20">
                    <div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md"
                >
                  Guardar
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2"
                >
                  Cancelar
                </button>
              </div>
              </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateCustomer;




// const UpdateCustomer = ({customerId, customerNameUpdate, customerLastName, customerDirection}: {customerId: number, customerNameUpdate: string, customerLastName:string, customerDirection:string}) => {
//     const [showModal, setShowModal] = useState(false);
//     const [newCustomerName, setNewCustomerName] = useState(customerNameUpdate);
//     const [newCustomerLastName, setNewCustomerLastName] = useState(customerLastName);
//     const [newCustomerDirection, setNewCustomerDirection] = useState(customerDirection);
//     const [error, setError] = useState('');
//     const {OnUpdateCustomer} = useCustomerStore();

//     const closeModal = () => {
//         setShowModal(false)
//         setNewCustomerName(customerNameUpdate)
//         setNewCustomerLastName(customerLastName)
//         setNewCustomerDirection(customerDirection)

//       }
             
    
//     const openModal = () => {
//         setShowModal(true)
//     }

//     const handleInputChangeN = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setNewCustomerName(e.target.value)
       
//     }
//     const handleInputChangeC = (e: React.ChangeEvent<HTMLInputElement>) => {
     
//       setNewCustomerLastName(e.target.value)

//   }
//   const handleInputChangeD = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewCustomerDirection(e.target.value)
// }

//     const handleSubmit = async () => {
//       if(newCustomerName.trim() !== '' && newCustomerLastName.trim() !== '' && newCustomerDirection.trim() !== ''){
//         await OnUpdateCustomer(customerId, newCustomerName, newCustomerLastName, newCustomerDirection);
//         closeModal()
//       }else{
//         setError('Revise que no queden campos vacios');
  
//       }
        
//     }



//     return (
//         <div>
          
//           <button onClick={openModal}  className="flex justify-center py-2 px-2 text-green-500">
//             <FaRegEdit size={26}></FaRegEdit>
//           </button>         
    
//           {showModal &&(
//             <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//               <div className="bg-white rounded-lg shadow-lg p-6">
//                 <span onClick={closeModal}></span>
//                 <h3 className="text-lg font-medium mb-4 text-center">Editar Cliente</h3>
//                 <form className="grid grid-cols-2">
//                   <div className="mb-4">
//                     <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Nombre:</label>
//                     <input type="text" value={newCustomerName} onChange={handleInputChangeN}  className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese el nombre"/> 

//                   </div>
//                   <div className=" ml-5">
//                     <label htmlFor="lastname" className="block text-gray-700 text-sm font-medium">Apellido:</label>
//                     <input type="string" value={newCustomerLastName} onChange={handleInputChangeC}  className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese el Apellido"/> 

//                   </div>
//                   <div className="mb-4 mt-2">
//                     <label htmlFor="direction" className="block text-gray-700 text-sm font-medium">Direccion:</label>
//                     <input type="text" value={newCustomerDirection} onChange={handleInputChangeD}  className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese la direccioin"/> 

//                   </div>
                  
//                 </form>
//                 <div className="flex justify-end">
//                     <button onClick={handleSubmit}  className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md">
//                       Guardar
//                     </button>
//                     <button onClick={closeModal} type="button" className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2">
//                       Cancelar
//                     </button>
//                   </div>
//                   {error && <p style={{ color: 'red' }}>{error}</p>}
//               </div>
//             </div>
//           )}
        
//         </div>
//       );
// }

// export default UpdateCustomer