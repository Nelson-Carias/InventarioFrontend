import { useEffect, useState } from "react";
import { get_suppliers } from "../../service/supplier.service";
import { IGetSuppliers } from "../../types/supplier.types";
import CreateSupplier from "./CreateSupplier";

export default function TableSupplier() {
  const [Suppliers, setSuppliers] = useState<IGetSuppliers[]>([]);

  useEffect(() => {
    get_suppliers("", 0, "").then(({ data }) => {
      setSuppliers(data.supplier);
    });
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <CreateSupplier></CreateSupplier>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Contacto
            </th>
            <th scope="col" className="px-6 py-3">
              Direccion
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {Suppliers &&  Suppliers.map((supplier) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">{supplier.id}</td>
                <td className="px-6 py-4">{supplier.name}</td>
                <td className="px-6 py-4">{supplier.contact}</td>
                <td className="px-6 py-4">{supplier.direction}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
