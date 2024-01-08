import React, { useEffect, useState } from "react";
import { useSupplierStore } from "../../store/supplier.store";
import { FaPlus } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";

interface SupplierFormProps {
  onSupplierCreated: () => void;
}

const CreateSupplier = ({ onSupplierCreated }: SupplierFormProps) => {
  const { OnGetSuppliers, OnCreateSupplier } = useSupplierStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    OnGetSuppliers(1, 5, "");
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
    contact: yup.string().required("*Contacto es requerido"),
    direction: yup.string().required("*Dirección es requerida"),


  });
 
  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      direction: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const supplierPayload = {
        name: values.name,
        contact: values.contact,
        direction: values.direction,
      };

      const result = await OnCreateSupplier(supplierPayload);
      if (result) {
        formik.resetForm();
        OnGetSuppliers(1, 5, "");
        closeModal();
        onSupplierCreated();
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
            <h3 className="text-lg font-medium mb-4 text-center ">Añadir Proveedor</h3>
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
                  Contacto:
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  className="w-full h-10 p-4 border rounded-xl"
                  placeholder="Contacto del proveedor"
                />
                {formik.errors.contact && formik.touched.contact && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.contact}
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

export default CreateSupplier;
