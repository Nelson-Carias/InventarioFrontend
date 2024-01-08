

import  { useEffect, useState } from "react";
import { useSupplierStore } from "../../store/supplier.store";
import CreateSupplier from "./CreateSupplier";
import UpdateSupplier from "./UpdateSupplier";
import { FaTrash } from "react-icons/fa";


export default function TableSupplier() {
    const { supplier, OnGetSuppliers, OnDeleteSupplier, pagination_supplier } = useSupplierStore();
    const [displayCount, setDisplayCount] = useState(5);
    const [supplierToDelete, setRoleToDelete] = useState<{
      id: number;
      supplierName: string;
    } | null>(null);
  
    useEffect(() => {
      OnGetSuppliers(1, displayCount, "");
    }, [OnGetSuppliers, displayCount]);
  
    const handleDelete = (id: number, supplierName: string) => {
      setRoleToDelete({ id, supplierName });
    };
  
    const ConfirmDelete = () => {
      if (supplierToDelete) {
        OnDeleteSupplier(supplierToDelete.id);
        alert(`Se ha eliminado el rol`);
        setRoleToDelete(null);
      }
    };
  
    const handleSearch = (name: string) => {
      OnGetSuppliers(1, 5, name);
    };
  
    const cancelToDelete = () => {
      setRoleToDelete(null);
    };
  
    const handleDisplayCountChange = (event: { target: { value: string } }) => {
      const newDisplayCount = parseInt(event.target.value, 10);
      setDisplayCount(newDisplayCount);
    };
  
    const handleNext = () => {
      console.log("Current Page:", pagination_supplier.currentPag);
      console.log("Total Pages:", pagination_supplier.totalPag);
  
      if (pagination_supplier.currentPag < pagination_supplier.totalPag) {
        OnGetSuppliers(pagination_supplier.currentPag + 1, displayCount, "");
      }
    };
  
    const handlePrev = () => {
      console.log("Current Page:", pagination_supplier.currentPag);
      console.log("Total Pages:", pagination_supplier.totalPag);
  
      if (pagination_supplier.currentPag > 1) {
        OnGetSuppliers(pagination_supplier.currentPag - 1, displayCount, "");
      }
    };
  
    console.log("Is Prev Button Disabled:", pagination_supplier.currentPag === 1);
    console.log(
      "Is Next Button Disabled:",
      pagination_supplier.currentPag === pagination_supplier.totalPag
    );
  
    return (
      <>
        <h5 className="flex justify-center text-2xl text-black">
          Lista de Proveedores
        </h5>
        <div className="flex items-end justify-end">
          <CreateSupplier
            onSupplierCreated={() => OnGetSuppliers(1, displayCount, "")}
          ></CreateSupplier>
        </div>
        <div className="inline-block w-full px-6 py-4">
          <div className="grid w-full grid-cols-3 gap-4 mt-5">
            <div className="flex w-full">
              <div className="flex flex-col w-full">
                <p className="text-sm font-semibold text-gray-800">
                  Buscar por nombre
                </p>
                <div className="flex items-center justify-center w-full mt-1">
                  <div className="relative flex items-center justify-center w-full mt-1">
                    {/* <FaSearch
                            icon="search"
                            className="text-gray-400 mr-3 absolute left-6"
                          /> */}
  
                    <input
                      placeholder="Escribe para buscar"
                      type="text"
                      aria-label="Search"
                      className="relative h-11  m-0 -mr-0.5 block min-w-0 flex-auto rounded-xl border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      onChange={(e) => {
                        handleSearch(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <p className="text-sm font-semibold text-gray-800">
                Cantidad a mostrar
              </p>
              <select
                className="w-full py-3 mt-2 text-sm font-semibold border outline-none rounded-xl"
                onChange={handleDisplayCountChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
  
        <div className="  relative overflow-x-auto shadow-md  sm:rounded-lg">
          <div className=" flex justify-center "></div>
  
          <table className="w-full text-sm text-left rtl:text-right text-gray-700">
            <thead className="text-xs">
              <tr className="bg-[#CCCCFF] text-black font-semi-bold text-xl">
                {/* <th scope="col" className="px-6 py-3">
                Id
              </th> */}
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Contacto
                </th>
                <th scope="col" className="px-6 py-3">
                  Direccion
                </th>
                <th scope="col" className="px-6 py-3 flex justify-center">
                  ACCIONES
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 mt-10">
              {supplier &&
                supplier.map((supplier) => (
                  <tr
                    key={supplier.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    {/* <td className="px-6 py-4">{rol.id}</td> */}
                    <td className="px-6 py-4">{supplier.name}</td>
                    <td className="px-6 py-4">{supplier.contact}</td>
                    <td className="px-6 py-4">{supplier.direction}</td>
  
                    <td className="py-2 px-4 whitespace-nowrap align-top text-center">
                      <div className="flex items-center justify-center space-x-5">
                        <UpdateSupplier supplier={supplier} id={supplier.id}  />
                        <button
                          onClick={() => handleDelete(supplier.id, supplier.name)}
                          className="text-red-500"
                        >
                          <FaTrash size={24}></FaTrash>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
  
        {supplierToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className=" bg-white p-4 rounded-lg shadow-lg">
              <p>
                ¿Estas seguro que quieres eliminar el Proveedor "{supplierToDelete.supplierName}
                "?
              </p>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={ConfirmDelete}
                  className="bg-[#E62E05] font-bold py-2 px-4 rounded-full"
                >
                  Si eliminar
                </button>
                <button
                  onClick={cancelToDelete}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full ml-4"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="pagination-controls flex items-center justify-center space-x-4">
          <button
            className={`px-4 py-2 border rounded-full shadow-md transition-transform transform hover:scale-105 ${
              pagination_supplier.currentPag === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
            onClick={handlePrev}
            disabled={pagination_supplier.currentPag === 1}
          >
            Atras
          </button>
          <span className="text-xl font-semibold text-gray-700">
            Pagina {pagination_supplier.currentPag} de {pagination_supplier.totalPag}
          </span>
          <button
            className={`px-4 py-2 border rounded-full shadow-md transition-transform transform hover:scale-105 ${
              pagination_supplier.currentPag === pagination_supplier.totalPag
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
            onClick={handleNext}
            disabled={pagination_supplier.currentPag === pagination_supplier.totalPag}
          >
            Siguiente
          </button>
        </div>
      </>
    );
  }
  