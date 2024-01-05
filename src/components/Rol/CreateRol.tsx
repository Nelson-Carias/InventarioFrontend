import React, { useEffect, useState } from "react";
import { useRoleStore } from "../../store/rol.store";
import { FaPlus } from "react-icons/fa";
import * as yup from "yup";
import { useFormik } from "formik";

interface RolFormProps {
  onRolCreated: () => void;
}

const CreateRol = ({ onRolCreated }: RolFormProps) => {
  const { OnGetRoles, OnCreateRol } = useRoleStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    OnGetRoles(1, 5, "");
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
    rol: yup.string().required("*Rol es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      rol: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const rolPayload = {
        rol: values.rol,
      };

      const result = await OnCreateRol(rolPayload);
      if (result) {
        formik.resetForm();
        OnGetRoles(1, 5, "");
        closeModal();
        onRolCreated();
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
            <h3 className="text-lg font-medium mb-4 text-center">Añadir Rol</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="rol"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Rol:
                </label>
                <input
                  type="text"
                  id="rol"
                  name="rol"
                  value={formik.values.rol}
                  onChange={formik.handleChange}
                  className="w-full h-10 p-4 border rounded-xl"
                  placeholder="Nombre del rol"
                />
                {formik.errors.rol && formik.touched.rol && (
                  <div className="text-red-600 text-sm mt-2">
                    {formik.errors.rol}
                  </div>
                )}
              </div>
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRol;
