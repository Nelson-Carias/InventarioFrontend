import React, { useEffect, useState } from "react";
import { useProductStore } from "../../store/product.store";
import { useFormik } from "formik";
import * as yup from "yup";
//import { ICreateProduct } from "../../types/product.types";
import { FaPlus } from "react-icons/fa";
import { useSupplierStore } from "../../store/supplier.store";

interface ProductFormProps {
  onProductCreated: () => void;
}

const CreateProduct = ({ onProductCreated }: ProductFormProps) => {
  const { OnGetProduct, OnCreateProduct } = useProductStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  useEffect(() => {
    OnGetProduct(1, 5, "");
  }, []);

  const { supplier, OnGetSupplierList } = useSupplierStore();
  useEffect(() => {
    OnGetSupplierList();
  }, [OnGetSupplierList]);

  //const supplierId = parseInt(selectedSupplier, 10);


  const resetFormik = () => {
   
    formik.resetForm();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSupplier("");
    resetFormik();
  };

  const validationSchema = yup.object({
    name: yup.string().required("*Nombre es requerido"),
    description: yup.string().required("*descripcion es requerido"),
    stock: yup.string().required("*estock es requerida"),
    supplierId:yup.string().required("*id de proveedor es requerido"),
    price:yup.string().required("*precio es requerido")
  });
  ///
  const formik = useFormik({
    
    initialValues: {
      name: "",
      description: "",
      price: 0 ,
      stock: 0,
      supplierId: 0,
      
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const productPayload = {
          
          name: values.name,
          description: values.description,
          stock: values.stock,
          supplierId: values.supplierId = parseInt(selectedSupplier, 10),
          //supplierId: values.supplierId,
          price: values.price,
        };
    
        const result = await OnCreateProduct(productPayload);
    
        if (result) {
          
          onProductCreated();
          formik.resetForm();
          OnGetProduct(1, 5, "");
          closeModal();
          
          
          console.log("La creación de datos fue exitosa");
        }
      } catch (error) {
        console.error("Error al crear el producto:", error);
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
            <h3 className="text-lg font-medium mb-4 text-center ">
              Añadir Producto
            </h3>
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
                  placeholder="Nombre del proveedor"
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
                  descripcion:
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  className="w-full h-10 p-4 border rounded-xl"
                  placeholder="Descripcion del proveedor"
                />
                {formik.errors.description && formik.touched.description && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.description}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="direction"
                  className="block text-gray-700 text-sm font-medium"
                >
                  stock:
                </label>
                <input
                  type="numeric"
                  id="stock"
                  name="stock"
                  value={formik.values.stock ===0 ?"": formik.values.stock}
                  onChange={formik.handleChange}
                  className="w-full h-10 p-4 border rounded-xl"
                  placeholder="cantidad del producto"
                />
                {formik.errors.stock && formik.touched.stock && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.stock}
                  </div>
                )}
              </div>

              <div className="flex flex-col ml-5">
              <p className="text-sm font-semibold text-gray-800">
                Seleccionar proveedor:
              </p>
              <select
                name="supplierId"
                id="supplierId"
                className=" text-sm font-medium text-gray-600 mt-1 p-2 border rounded-md"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
              >
                <option value="">Todos los proveedores</option>
                {supplier&& supplier.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name} 
                  </option>
                ))}
                 {formik.errors.supplierId && formik.touched.supplierId && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.supplierId}
                  </div>
                )}
              </select>
            </div>

              <div className="mb-4">
                <label
                  htmlFor="direction"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Precio:
                </label>
                <input
                  type="numeric"
                  id="price"
                  name="price"
                  value={formik.values.price ===0 ? "": formik.values.price}
                  onChange={formik.handleChange}
                  className="w-full h-10 p-4 border rounded-xl"
                  placeholder="precio del producto"
                />
                {formik.errors.price && formik.touched.price && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.price}
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

export default CreateProduct;

// const  CreateProduct = ({ onProductCreated }: SupplierFormProps)=>{
//   const {product, OnGetProduct} = useProductStore()
//   const [error, setError] = useState('');
//   React.useEffect(() => {
//     OnGetProduct("");
//   }, []);

//  const [showModal, setShowModal] = useState(false);

//  const {OnCreateProduct} = useProductStore();
//  const [product, setProduct] = useState<ICreateProduct>({
//     name: '',
//     description: '',
//     price: 0,
//     stock: 0,
//     supplierId: 0,
//  })

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false)
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
//     const {name, value} = e.target;
//     setProduct({
//       ...product,
//       [name]: value
//     })
//   }

//   const handleSubmit = async ()=>{

//       if(product.name.trim()  == '' || product.description.trim() == '' || product.price <=0 || product.stock <= 0 || product.supplierId <=0 ){

//         setError('Revise que no queden campos vacios');

//         console.log("nel perro")

//       }else{
//         await OnCreateProduct(product)
//        // setShowModal(true);
//       }

//   }

//   return (
//     <div className="bg-white p-2  opacity-100">
//       <h5 className='flex justify-center text-2xl'>Lista de Productos</h5>
//       <button onClick={openModal}  className="flex justify-center m-5  py-4 px-4   rounded-full bg-blue-500 text-white">
//       <FaPlus></FaPlus>

//       </button>

//       {showModal &&(
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
//           <div className="bg-white rounded-lg shadow-lg p-6 ">
//             <h3 className="text-lg font-medium mb-4 text-center">Añadir Producto</h3>
//             <form >
//               <div className="mb-4 grid grid-cols-2">
//                 <div>
//                 <label htmlFor="user" className="block text-gray-700 text-sm font-medium">Nombre:</label>
//                 <input  type="text" name="name" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="Nombre del Producto"/>
//                 </div>

//                 <div className='ml-5'>
//                   <label>Descripcion</label>
//                   <input  type="text" name="description" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="Descripción del producto"/>

//                 </div>

//                 <div className='mt-5 '>
//                   <label>Precio</label>
//                   <input  type="text" name="price" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="Precio del Producto"/>

//                 </div>

//                 <div className='mt-5 ml-5 '>
//                   <label>Stock</label>
//                   <input  type="text" name="stock" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="Stock"/>

//                 </div>

//                 <div className='mt-5'>
//                   <label>Proveedor</label>
//                   <select name="supplierId" onChange={(e) => handleInputChange(e)} value={product.supplierId} className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4" >
//                     <option value="" >Selecciona un Proveedor</option>
//                     {supplier.map((supplier) => (
//                         <option key={supplier.id} value={supplier.id}>
//                             {supplier.name}
//                         </option>
//                     ))}
//                 </select>
//                 </div>

//               </div>
//               <div className="flex justify-end">
//                 <button onClick={handleSubmit} className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md">
//                   Guardar
//                 </button>
//                 <button onClick={closeModal} type="button" className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2">
//                   Cancelar
//                 </button>
//               </div>
//               {error && <p style={{ color: 'red' }}>{error}</p>}
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
