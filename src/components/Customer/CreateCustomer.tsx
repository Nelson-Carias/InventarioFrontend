import React, { useEffect, useState } from "react";
import {useCustomerStore} from '../../store/customer.store';
import { FaPlus } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";

interface CustomerFormProps {
  onCustomerCreated: () => void;
}

const CreateCustomer = ({ onCustomerCreated }: CustomerFormProps) => {
  const { OnGetCustomer, OnCreateCustomer } = useCustomerStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    OnGetCustomer(1, 5, "");
  }, []);

  const resetFormik = () => {
    formik.resetForm();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetFormik();
  };

  const validationSchema = yup.object({
    name:  yup.string().required("*Nombre es requerido"),
    lastName: yup.string().required("*Apellido es requerido"),
    direction: yup.string().required("*Dirección es requerida"),


  });
 
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      direction: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const customerPayload = {
        name: values.name,
        lastName: values.lastName,
        direction: values.direction,
      };

      const result = await OnCreateCustomer(customerPayload);
      if (result) {
        formik.resetForm();
        OnGetCustomer(1, 5, "");
        closeModal();
        onCustomerCreated();
        console.error("La creación de datos falló");
      }
    },
  });

  return (
    <div className="bg-white p-2  opacity-100">
      <button
        onClick={openModal}
        className="flex justify-center  py-4 px-4   rounded-full bg-green-500 text-white"
      >
        <FaPlus></FaPlus>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-center ">Añadir Cliente</h3>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-2">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-medium "
                >
                  Nombre:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="w-full h-10 p-4 border rounded-xl"
                  placeholder="Nombre del cliente"
                />
                {formik.errors.name && formik.touched.name && (
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
                  className="w-full h-10 p-4 border rounded-xl"
                  placeholder="Apellido del cliente"
                />
                {formik.errors.lastName && formik.touched.lastName && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.lastName}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="direction"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Direccion:
                </label>
                <input
                  type="text"
                  id="direction"
                  name="direction"
                  value={formik.values.direction}
                  onChange={formik.handleChange}
                  className="w-full h-10 p-4 border rounded-xl"
                  placeholder="Direction del proveedor"
                />
                {formik.errors.direction && formik.touched.direction && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.direction}
                  </div>
                )}
              </div>



              <div className="mt-20">
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCustomer;




// export default function CreateCustomer(){
//   const {OnCreateCustomer} = useCustomerStore();
//   const[customerName, setCustomerName] = useState('');
//   const[customerLastName, setCustomerLastName] = useState('');
//   const[customerDirection, setCustomerDirection] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [error, setError] = useState('');
//   const closeModal = () => {
//     setError('');
//     setCustomerName('');
//     setCustomerLastName('');
//     setCustomerDirection('');
//     setShowModal(false)
//   }
         

//   const openModal = () => {
//       setShowModal(true);
//   }

//   const handleInputChangeN = (e: React.ChangeEvent<HTMLInputElement>) =>{
//     setCustomerName(e.target.value)
    
//   }
//   const handleInputChangeC = (e: React.ChangeEvent<HTMLInputElement>) =>{
//     setCustomerLastName(e.target.value)
//   }
//   const handleInputChangeD = (e: React.ChangeEvent<HTMLInputElement>) =>{
    
//     setCustomerDirection(e.target.value)
//   }

//   const handleSubmit = async () => {
//   if(customerName.trim() !== '' && customerLastName.trim() !== '' && customerDirection.trim() !== ''){
//       await OnCreateCustomer(customerName, customerLastName, customerDirection);
//       closeModal()
//     }else{
//       setError('Revise que no queden campos vacios');

//     }
//   }

//   return (
//     <div className="bg-white p-2  opacity-100">
//       <button onClick={openModal}  className="flex justify-center m-5  py-4 px-4   rounded-full bg-green-500 text-white">
//         <FaPlus></FaPlus>
//       </button>

//       {showModal &&(
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-lg font-medium mb-4 text-center">Añadir Cliente</h3>
//             <form className='grid grid-cols-2'>
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Nombre:</label>
//                 <input  type="text" value={customerName} onChange={handleInputChangeN} className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese el nombre"/> 
//               </div>

//               <div className="mb-4 ml-5">
//                 <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Apellido:</label>
//                 <input  type="text" value={customerLastName} onChange={handleInputChangeC} className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese el Apellido"/> 
//               </div>


//               <div className="mb-4 mt-5">
//                 <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Direcciòn:</label>
//                 <input  type="text" value={customerDirection} onChange={handleInputChangeD} className="w-full h-10 p-4 border rounded-xl" placeholder="Ingrese La Direccion"/> 
//               </div>
              

              
//             </form>
//             <div className="flex justify-end">
//                 <button onClick={handleSubmit} className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md">
//                   Guardar
//                 </button>
//                 <button onClick={closeModal} type="button" className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2">
//                   Cancelar
//                 </button>
//               </div>
//               {error && <p style={{ color: 'red' }}>{error}</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
    

