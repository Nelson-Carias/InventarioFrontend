import React, { useState } from "react";
import { useSupplierStore } from "../../store/supplier.store";
import { FaRegEdit } from "react-icons/fa";

import * as yup from "yup";
import { useFormik } from "formik";

interface UpdateSupplierProps {
  id: number;
  supplier: {
    id: number;
    name: string;
    contact: string;
    direction: string;
  };
}



const UpdateSupplier: React.FC<UpdateSupplierProps> = ({ supplier }) => {
  const [showModal, setShowModal] = useState(false);
  const statusOfSupplier = useSupplierStore();
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
    contact: yup.string().required("*Contacto es requerido"),
    direction: yup.string().required("*Dirección es requerida"),

  });

  const openModal = () => {
    setShowModal(true);
  };
  const formik = useFormik({
    initialValues: {
      name: supplier.name,
      contact: supplier.contact,
      direction: supplier.direction

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const supplierPayload = {
        name: values.name,
        contact: values.contact,
        direction: values.direction
      };
      await statusOfSupplier.OnUpdateSupplier(supplier.id, supplierPayload);
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
              Modificar Proveedor
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
                  Contacto:
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=""
                  className="text-sm text-gray-600 mt-1 p-3 w-full border rounded-md"
                />
                {formik.touched.contact && formik.errors.contact && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.contact}
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

export default UpdateSupplier;
