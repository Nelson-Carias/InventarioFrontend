import { useEffect, useState } from "react";
import useProductStore from "../../store/product.store";
import UpdateProduct from "./UpdateProduct";
import CreateProduct from "./CreateProduct";
import { FaTrash } from "react-icons/fa";

export default function TableProduct() {
    const {products, OnGetProducts, OnDeleteProduct} = useProductStore();
    const [productToDelete, setProductToDelete] = useState<{id: number; productName: string} | null>(null)
     
  
    useEffect(() =>{
      OnGetProducts();
    }, [])

    const handleDelete = (id: number, productName: string)=> {
      setProductToDelete({id, productName});
    }

    const ConfirmDelete = () => {
      if (productToDelete){
        OnDeleteProduct(productToDelete.id);
        alert(`Se ha eliminado el Producto`)
        setProductToDelete(null);
      }
    }

    const cancelToDelete = () => {
      setProductToDelete(null);
    }
  
    return (
      // <>
      // <NavMenu>
      <>
      <CreateProduct></CreateProduct>
      <div className="relative overflow-x-auto shadow-md   ">
        <div className=" flex justify-center"></div>
        
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-[#CCCCFF] text-black text-xl">
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                 Proveedor
              </th>
              <th scope="col" className="px-6 py-3">
                  Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                  Descripción
              </th>
              <th scope="col" className="px-6 py-3">
                  Precio
              </th>
              <th scope="col" className="px-6 py-3">
                  Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {products && products.map((product) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4">{product.supplier.name}</td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="py-2 px-4 whitespace-nowrap align-top text-center">
                  
                  <div className="flex items-center justify-center space-x-5">
                    <UpdateProduct id={product.id} newNameProduct={product.name} newDescriptionProduct={product.description} newPriceProduct={product.price} newStockProduct={product.stock} newSupplierProduct={product.supplierId}></UpdateProduct>
                    <button onClick={() => handleDelete(product.id, product.name)} className="text-red-500" >
                       <FaTrash size={24}></FaTrash>
                    </button>
                    
                  </div>
                    
                  
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {productToDelete && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className=" bg-white p-4 rounded-lg shadow-lg">
          <p>¿Estas seguro que quieres eliminar el usuario "{productToDelete.productName}"?</p>
          <div className="mt-4 flex justify-center">
            <button onClick={ConfirmDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                Si
            </button>
            <button onClick={cancelToDelete} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full ml-4">
                Cancelar
            </button>

          </div>

        </div>

      </div>
    )}
      </>
      // </NavMenu>
      // </>
    );
  }
  