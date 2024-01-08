import React, { useState } from 'react';
import useProductStore from '../../store/product.store';
// import useRoleStore from '../../store/rol.store';

import { ICreateProduct,  } from '../../types/product.types';
// import { OnGetProducts } from '../store/product.store';

import { FaPlus } from 'react-icons/fa';
//import useSupplierStore from '../../store/supplier.store';
import { useSupplierStore } from '../../store/supplier.store';


export default function CreateProduct(){
  const {supplier, OnGetSupplier} = useSupplierStore()
  const [error, setError] = useState('');
  React.useEffect(() => {
    OnGetSupplier("");
  }, []);

 const [showModal, setShowModal] = useState(false);


 const {OnCreateProduct} = useProductStore();
 const [product, setProduct] = useState<ICreateProduct>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    supplierId: 0,
 })
 
  const openModal = () => {
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
    const {name, value} = e.target;
    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = async ()=>{
    
      if(product.name.trim()  == '' || product.description.trim() == '' || product.price <=0 || product.stock <= 0 || product.supplierId <=0 ){
        
        setError('Revise que no queden campos vacios');
  
        console.log("nel perro")
     
      }else{
        await OnCreateProduct(product)
       // setShowModal(true);
      }
     
    
  }
     
  



  return (
    <div className="bg-white p-2  opacity-100">
      <h5 className='flex justify-center text-2xl'>Lista de Productos</h5>
      <button onClick={openModal}  className="flex justify-center m-5  py-4 px-4   rounded-full bg-blue-500 text-white">
      <FaPlus></FaPlus>
      
      </button>
      
      {showModal &&(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
          <div className="bg-white rounded-lg shadow-lg p-6 ">
            <h3 className="text-lg font-medium mb-4 text-center">Añadir Producto</h3>
            <form >
              <div className="mb-4 grid grid-cols-2">
                <div>
                <label htmlFor="user" className="block text-gray-700 text-sm font-medium">Nombre:</label>
                <input  type="text" name="name" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="Nombre del Producto"/>               
                </div>

                <div className='ml-5'>
                  <label>Descripcion</label>
                  <input  type="text" name="description" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="Descripción del producto"/> 

                </div>

                <div className='mt-5 '>
                  <label>Precio</label>
                  <input  type="text" name="price" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="Precio del Producto"/> 

                </div>

                <div className='mt-5 ml-5 '>
                  <label>Stock</label>
                  <input  type="text" name="stock" onChange={handleInputChange} className="w-full h-10 p-4 border rounded-xl" placeholder="Stock"/> 

                </div>

                <div className='mt-5'>
                  <label>Proveedor</label>
                  <select name="supplierId" onChange={(e) => handleInputChange(e)} value={product.supplierId} className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4" >
                    <option value="" >Selecciona un Proveedor</option>
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
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
    