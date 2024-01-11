

import  { useEffect, useState } from "react";
import { useCustomerStore } from "../../store/customer.store";
import CreateCustomer from "./CreateCustomer";
import UpdateCustomer from "./UpdateCustomer";
import { FaTrash } from "react-icons/fa";




export default function TableCustomer() {
  const { customer, OnGetCustomer, OnDeleteCustomer, pagination_customer } = useCustomerStore();
  const [displayCount, setDisplayCount] = useState(5);
  const [customerToDelete, setCustomerToDelete] = useState<{
    id: number;
    customerName: string;
  } | null>(null);

  useEffect(() => {
    OnGetCustomer(1, displayCount, "");
  }, [OnGetCustomer, displayCount]);

  const handleDelete = (id: number, customerName: string) => {
    setCustomerToDelete({ id, customerName });
  };

  const ConfirmDelete = () => {
    if (customerToDelete) {
      OnDeleteCustomer(customerToDelete.id);
      alert(`Se ha eliminado el Cliente`);
      setCustomerToDelete(null);
    }
  };

  const handleSearch = (name: string) => {
    OnGetCustomer(1, 5, name);
  };

  const cancelToDelete = () => {
    setCustomerToDelete(null);
  };

  const handleDisplayCountChange = (event: { target: { value: string } }) => {
    const newDisplayCount = parseInt(event.target.value, 10);
    setDisplayCount(newDisplayCount);
  };

  const handleNext = () => {
    console.log("Current Page:", pagination_customer.currentPag);
    console.log("Total Pages:", pagination_customer.totalPag);

    if (pagination_customer.currentPag < pagination_customer.totalPag) {
      OnGetCustomer(pagination_customer.currentPag + 1, displayCount, "");
    }
  };

  const handlePrev = () => {
    console.log("Current Page:", pagination_customer.currentPag);
    console.log("Total Pages:", pagination_customer.totalPag);

    if (pagination_customer.currentPag > 1) {
      OnGetCustomer(pagination_customer.currentPag - 1, displayCount, "");
    }
  };

  console.log("Is Prev Button Disabled:", pagination_customer.currentPag === 1);
  console.log(
    "Is Next Button Disabled:",
    pagination_customer.currentPag === pagination_customer.totalPag
  );

  return (
    <>
      <h5 className="flex justify-center text-2xl text-black">
        Lista de Clientes
      </h5>
      <div className="flex items-end justify-end">
        <CreateCustomer
          onCustomerCreated={() => OnGetCustomer(1, displayCount, "")}
        ></CreateCustomer>
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
                Apellido
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
            {customer &&
              customer.map((customer) => (
                <tr
                  key={customer.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  {/* <td className="px-6 py-4">{rol.id}</td> */}
                  <td className="px-6 py-4">{customer.name}</td>
                  <td className="px-6 py-4">{customer.lastName}</td>
                  <td className="px-6 py-4">{customer.direction}</td>

                  <td className="py-2 px-4 whitespace-nowrap align-top text-center">
                    <div className="flex items-center justify-center space-x-5">
                      <UpdateCustomer customer={customer} id={customer.id}  />
                      <button
                        onClick={() => handleDelete(customer.id, customer.name)}
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

      {customerToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" bg-white p-4 rounded-lg shadow-lg">
            <p>
              ¿Estas seguro que quieres eliminar el Proveedor "{customerToDelete.customerName}
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
            pagination_customer.currentPag === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
          onClick={handlePrev}
          disabled={pagination_customer.currentPag === 1}
        >
          Atras
        </button>
        <span className="text-xl font-semibold text-gray-700">
          Pagina {pagination_customer.currentPag} de {pagination_customer.totalPag}
        </span>
        <button
          className={`px-4 py-2 border rounded-full shadow-md transition-transform transform hover:scale-105 ${
            pagination_customer.currentPag === pagination_customer.totalPag
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
          onClick={handleNext}
          disabled={pagination_customer.currentPag === pagination_customer.totalPag}
        >
          Siguiente
        </button>
      </div>
    </>
  );
}


// export default function TableCustomer() {
//   const {customer, OnGetCustomer, OnDeleteCustomer} = useCustomerStore();
//   const [customerToDelete, setCustomerToDelete] = useState<{id: number; customerName: string, customerLastName:string, customerDirection:string} | null>(null)
  
//   useEffect(() =>{
//     OnGetCustomer("");
//   }, [])

//   const handleDelete = (id: number, customerName: string, customerLastName:string, customerDirection:string) => {
//     setCustomerToDelete({id, customerName, customerLastName, customerDirection
//     });
//   }

//   const ConfirmDelete = () => {
//     if (customerToDelete) {
//       OnDeleteCustomer(customerToDelete.id);
//       alert(`Se ha eliminado el Cliente`)
//       setCustomerToDelete(null);
//     }
//   }

//   const cancelToDelete = () =>{
//     setCustomerToDelete(null);
//   }

//   const handleSearch = (name: string) =>{
//     OnGetCustomer(name)
// }
  

//   return (
//     <>
//     <NavMenu>
//     <>
//     <h5 className='flex justify-center text-2xl'>Lista de Clientes</h5>
    
//     <CreateCustomer></CreateCustomer>
    
//     <div className=" container mx-auto mt-3">
      
//       <div className=" flex justify-center "></div>
//       <div className="flex justify-start p-5">
//       <p>Buscar por nombre</p>
//       <input placeholder="Escribe para buscar"
//       type="text"
//       onChange={(e) =>{
//         handleSearch(e.target.value)
//       }}/>
      
//     </div>
//       <table className="w-full text-sm text-left rtl:text-right text-gray-700">
//         <thead >
//           <tr className="bg-[#186696] text-white font-semi-bold text-xl" >
//             {/* <th scope="col" className="px-6 py-3">
//               Id
//             </th> */}
//             <th scope="col" className="px-6 py-3">
//               Nombre
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Apellido
//             </th> <th scope="col" className="px-6 py-3">
//               Direccion
//             </th>
//             <th scope="col" className="px-6 py-3 flex justify-center">
//               Acciones
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200 mt-10">
//           {customer && customer.map((customer) => (
//             <tr key={customer.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
//               {/* <td className="px-6 py-4">{rol.id}</td> */}
//               <td className="px-6 py-4">{customer.name}</td>
//               <td className="px-6 py-4">{customer.lastName}</td>
//               <td className="px-6 py-4">{customer.direction}</td>
              
//                 <td className="py-2 px-4 whitespace-nowrap align-top text-center">
                  
//                   <div className="flex items-center justify-center space-x-5">
//                     <UpdateCustomer customerId={customer.id} customerNameUpdate={customer.name} customerLastName={customer.lastName} customerDirection={customer.direction}></UpdateCustomer>
//                     <button onClick={() => handleDelete(customer.id, customer.name, customer.lastName, customer.direction)} className="text-red-500" >
//                        <FaTrash size={24}></FaTrash>
//                     </button>

                    
//                   </div>
                  
                  
//                 </td>
              
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>

//     {customerToDelete && (
//       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//         <div className="bg-white p-4 rounded-lg shadow-lg">
//           <p>¿Estas seguro que quieres eliminar el Cliente "{customerToDelete.customerName} "?</p>
//           <div className="mt-4 flex justify-center">
//             <button onClick={ConfirmDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
//                 eliminar
//             </button>
//             <button onClick={cancelToDelete} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full ml-4">
//                 Cancelar
//             </button>

//           </div>

//         </div>

//       </div>
//     )}

//     </>
//     </NavMenu>
//     </>
//   );
// }
