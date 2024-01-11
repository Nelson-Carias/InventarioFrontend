import React, { useEffect, useState } from "react";
import { useProductStore } from "../../store/product.store";
import { useSupplierStore } from "../../store/supplier.store";
import { FaRegEdit } from "react-icons/fa";

import * as yup from "yup";
import { useFormik } from "formik";

interface UpdateProductProps {
  id: number;
  product: {
    id: number;
    name: string;
    description: string;
    stock: number;
    supplierId: number;
    price: number;
  };
}

const UpdateProduct: React.FC<UpdateProductProps> = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const statusOfProduct = useProductStore();
  const resetFormik = () => {
    formik.resetForm();
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedSupplier("");
    resetFormik();
  };
  const { supplier, OnGetSupplierList } = useSupplierStore();
  useEffect(() => {
    OnGetSupplierList();
  }, [OnGetSupplierList]);

  const validationSchema = yup.object({
    name: yup.string().required("*Nombre es requerido"),
    description: yup.string().required("*descripcion es requerido"),
    stock: yup.string().required("*estock es requerida"),
    supplierId: yup.string().required("*id de proveedor es requerido"),
    price: yup.string().required("*precio es requerido"),
  });

  const openModal = () => {
    setShowModal(true);
  };
  const formik = useFormik({
    initialValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      supplierId: product.supplierId,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const productPayload = {
        name: values.name,
        description: values.description,
        stock: values.stock,
        supplierId: values.supplierId = parseInt(selectedSupplier, 10),

        price: values.price,
      };
      await statusOfProduct.OnUpdateProduct(product.id, productPayload);
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
              Modificar Producto
            </h3>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-2">
              <div className="mb-4">
                <label
                  htmlFor="product"
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
                  className="text-sm text-gray-600 mt-1 p-3 w-full border rounded-xl"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              <div className="mb-4 ml-5">
                <label
                  htmlFor="product"
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
                  onBlur={formik.handleBlur}
                  placeholder=""
                  className="text-sm text-gray-600 mt-1 p-3 w-full border rounded-xl"
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.description}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="product"
                  className="block text-gray-700 text-sm font-medium"
                >
                  stock:
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formik.values.stock === 0 ? "" : formik.values.stock}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=""
                  className="text-sm text-gray-600 mt-1 p-3 w-full border rounded-xl"
                />
                {formik.touched.stock && formik.errors.stock && (
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
                  defaultValue={product.supplierId || formik.values.supplierId}
                  onChange={(e) => {
                    formik.handleChange, setSelectedSupplier(e.target.value);
                  }}
                >
                  <option value="product.supplier.name" disabled>
                    Todos los proveedores
                  </option>
                  {supplier &&
                    supplier.map((supplier) => (
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
                  htmlFor="product"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Precio:
                </label>
                <input
                  type="numeric"
                  id="price"
                  name="price"
                  value={formik.values.price === 0 ? "" : formik.values.price}
                  onChange={formik.handleChange}
                  className="w-full h-10 p-4 border rounded-xl"
                  placeholder=""
                />
                {formik.errors.price && formik.touched.price && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.price}
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

export default UpdateProduct;

// const UpdateProduct = ({id, newNameProduct, newDescriptionProduct, newPriceProduct, newStockProduct, newSupplierProduct} : {id: number, newNameProduct:string, newDescriptionProduct: string, newPriceProduct: number, newStockProduct: number, newSupplierProduct: number}) =>{
//     const {supplier, OnGetSupplier} = useSupplierStore();
//     React.useEffect(() =>{
//         OnGetSupplier();
//     }, [])

//     const {OnUpdateProduct} = useProductStore();
//     const [newName, setNewName] = useState(newNameProduct);
//     const [newDescription, setNewDescription] = useState(newDescriptionProduct)
//     const [newPrice, setNewPrice] = useState(newPriceProduct);
//     const [newStock, setNewStock] = useState(newStockProduct);
//     const [newSupplier, setNewSupplier] = useState(newSupplierProduct)
//     const [showModal, setShowModal] = useState(false)

//     const openModal = () => {
//         setShowModal(true);
//     }

//     const closeModal = () => {
//         setShowModal(false);
//     }

//     const handleInputChangeN =  (e: React.ChangeEvent<HTMLInputElement>) => {
//         setNewName(e.target.value);
//     }

//     const handleInputChangeD = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setNewDescription(e.target.value)
//     }

//     const handleInputChangeP = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setNewPrice(Number(e.target.value));
//     }

//     const handleInputChangeS = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setNewStock(Number(e.target.value));
//     }

//     const handleSelectChangeSP = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setNewSupplier(Number(e.target.value));
//     }

//     const handleSubmit = async () => {
//         if (newName.trim() !== ''){
//             const updateProduct = {
//                 id: id,
//                 name: newName,
//                 description: newDescription,
//                 price: newPrice,
//                 stock: newStock,
//                 supplierId: newSupplier,
//             }

//             await OnUpdateProduct(id, updateProduct);
//             closeModal();
//         }
//     }

//     return (
//         <div>
//           <button onClick={openModal}  className="flex justify-center py-2 px-2 text-[#22CCEE]">
//             <FaRegEdit size={26}></FaRegEdit>
//           </button>

//           {showModal &&(
//             <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//               <div className="bg-white rounded-lg shadow-lg p-6">
//                 <h3 className="text-lg font-medium mb-4 text-center">Editar Producto</h3>
//                 <form >
//                 <div className="modal container bg-white  grid grid-cols-2 ">

//                         <div className="">
//                         <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Nombres:</label>
//                         <input id="name"  type="text" value={newName} onChange={handleInputChangeN} className="w-full h-10 p-4 border border-gray-300 rounded-xl" placeholder="Nombre del producto"/>
//                         </div>

//                         <div className="ml-5 ">
//                         <label htmlFor="description" className="block text-gray-700 text-sm font-medium">Descripción:</label>
//                         <input id="description" type="text" value={newDescription} onChange={handleInputChangeD} className="w-full h-10 p-4 border border-gray-300 rounded-xl" placeholder="Descripción del producto"/>
//                         </div>

//                         <div className="">
//                         <label htmlFor="price" className="block text-gray-700 text-sm font-medium mt-3">Price:</label>
//                         <input id="price" type="text" value={newPrice} onChange={handleInputChangeP} className="w-full h-10  p-4 border border-gray-300 rounded-xl" placeholder="Precio del Producto"/>
//                         </div>

//                         <div className="ml-5">
//                         <label htmlFor="stock" className="block text-gray-700 text-sm font-medium mt-3">Stock:</label>
//                         <input id="password" type="text" value={newStock} onChange={handleInputChangeS} className="w-full h-10 p-4 border border-gray-300 rounded-xl" placeholder="Stock del producto"/>
//                         </div>

//                         <div className="">
//                         <label htmlFor="supplierId" className="block font-semibold ">Selecciona un Proveedor:</label>
//                         <select id="supplierId" name="supplierId" onChange={(e) => handleSelectChangeSP(e)} value={newSupplier} className="w-full border-gray-300 border rounded-lg px-3 py-2 " >
//                             <option value="" disabled>Selecciona un rol</option>
//                             {supplier.map((supplier) => (
//                                 <option key={supplier.id} value={supplier.id}>
//                                     {supplier.name}
//                                 </option>
//                             ))}
//                         </select>
//                         </div>
//                     </div>
//                   <div className="flex justify-end">
//                     <button onClick={handleSubmit} className="px-4 py-2 text-black bg-blue-600 text-sm font-medium rounded-md">
//                       Guardar
//                     </button>
//                     <button onClick={closeModal} type="button" className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2">
//                       Cancelar
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       );

// }

// export default UpdateProduct
