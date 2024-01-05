import React, { useState } from "react";
import { useRoleStore } from "../../store/rol.store";
import { FaRegEdit } from "react-icons/fa";
// import { Tooltip } from 'react-tooltip'
import * as yup from "yup";
import { useFormik } from "formik";

interface UpdateRolProps {
  id: number;
  rol: {
    id: number;
    rol: string;
  };
}

const UpdateRol: React.FC<UpdateRolProps> = ({ rol }) => {
  const [showModal, setShowModal] = useState(false);

  const statusOfRol = useRoleStore();

  const closeModal = () => {
    setShowModal(false);
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
    rol: yup.string().required("*El campo es requerido"),
  });

  const openModal = () => {
    setShowModal(true);
  };
  const formik = useFormik({
    initialValues: {
      rol: rol.rol,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const rolPayload = {
        rol: values.rol,
      };
      await statusOfRol.OnUpdateRol(rol.id, rolPayload);
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
              Modificar Rol
            </h3>
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
                  onBlur={formik.handleBlur}
                  placeholder=""
                  className="text-sm text-gray-600 mt-1 p-3 w-full border rounded-md"
                />
                {formik.touched.rol && formik.errors.rol && (
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

export default UpdateRol;
