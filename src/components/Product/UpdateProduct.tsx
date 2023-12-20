import React, { useState } from "react";
import useProductStore from "../../store/product.store";
import useSupplierStore from "../../store/supplier.store";
import { FaRegEdit } from "react-icons/fa";

const UpdateProduct = ({id, newNameProduct, newDescriptionProduct, newPriceProduct, newStockProduct, newSupplierProduct} : {id: number, newNameProduct:string, newDescriptionProduct: string, newPriceProduct: number, newStockProduct: number, newSupplierProduct: number}) =>{
    const {supplier, OnGetSupplier} = useSupplierStore();
    React.useEffect(() =>{
        OnGetSupplier();
    }, [])

    const {OnUpdateProduct} = useProductStore();
    const [newName, setNewName] = useState(newNameProduct);
    const [newDescription, setNewDescription] = useState(newDescriptionProduct)
    const [newPrice, setNewPrice] = useState(newPriceProduct);
    const [newStock, setNewStock] = useState(newStockProduct);
    const [newSupplier, setNewSupplier] = useState(newSupplierProduct)
    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    
    const handleInputChangeN =  (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    }

    const handleInputChangeD = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDescription(e.target.value)
    }

    const handleInputChangeP = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPrice(Number(e.target.value));
    }

    const handleInputChangeS = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewStock(Number(e.target.value));
    }

    const handleSelectChangeSP = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewSupplier(Number(e.target.value));
    }

    const handleSubmit = async () => {
        if (newName.trim() !== ''){
            const updateProduct = {
                id: id,
                name: newName,
                description: newDescription,
                price: newPrice,
                stock: newStock,
                supplierId: newSupplier,
            }

            await OnUpdateProduct(id, updateProduct);
            closeModal();
        }
    }

    return (
        <div>
          <button onClick={openModal}  className="flex justify-center py-2 px-2 text-[#22CCEE]">
            <FaRegEdit size={26}></FaRegEdit>
          </button> 
          
          {showModal &&(
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-medium mb-4 text-center">Editar Producto</h3>
                <form >
                <div className="modal container bg-white  grid grid-cols-2 ">

                        <div className="">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Nombres:</label>
                        <input id="name"  type="text" value={newName} onChange={handleInputChangeN} className="w-full h-10 p-4 border border-gray-300 rounded-xl" placeholder="Nombre del producto"/> 
                        </div>

                        <div className="ml-5 ">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-medium">Descripción:</label>
                        <input id="description" type="text" value={newDescription} onChange={handleInputChangeD} className="w-full h-10 p-4 border border-gray-300 rounded-xl" placeholder="Descripción del producto"/> 
                        </div>

                        <div className="">
                        <label htmlFor="price" className="block text-gray-700 text-sm font-medium mt-3">Price:</label>
                        <input id="price" type="text" value={newPrice} onChange={handleInputChangeP} className="w-full h-10  p-4 border border-gray-300 rounded-xl" placeholder="Precio del Producto"/> 
                        </div>

                        <div className="ml-5">
                        <label htmlFor="stock" className="block text-gray-700 text-sm font-medium mt-3">Stock:</label>
                        <input id="password" type="text" value={newStock} onChange={handleInputChangeS} className="w-full h-10 p-4 border border-gray-300 rounded-xl" placeholder="Stock del producto"/> 
                        </div>

                        <div className="">
                        <label htmlFor="supplierId" className="block font-semibold ">Selecciona un Proveedor:</label>
                        <select id="supplierId" name="supplierId" onChange={(e) => handleSelectChangeSP(e)} value={newSupplier} className="w-full border-gray-300 border rounded-lg px-3 py-2 " >
                            <option value="" disabled>Selecciona un rol</option>
                            {supplier.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                        </div>
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

export default UpdateProduct 