import React, { useState } from "react";
import useUserStore from "../../store/user.store";
import { useRoleStore } from "../../store/rol.store";
import { FaRegEdit } from "react-icons/fa";

const UpdateUser = ({
  id,
  newNameUser,
  newLastNameUser,
  newEmailUser,
  newRolId,
}: {
  id: number;
  newNameUser: string;
  newLastNameUser: string;
  newEmailUser: string;
  newRolId: number;
}) => {
  const { roles, OnGetRoles } = useRoleStore();
  React.useEffect(() => {
    OnGetRoles(1, 10, "");
  }, []);

  const { OnUpdateUser } = useUserStore();
  const [newName, setNewName] = useState(newNameUser);
  const [newLastName, setNewLastName] = useState(newLastNameUser);
  const [newEmail, setNewEmail] = useState(newEmailUser);
  const [newRol, setNewRol] = useState(newRolId);
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewName(newNameUser);
    setNewLastName(newLastNameUser);
    setNewEmail(newEmailUser);
    setNewPassword("");
    setNewRol(newRolId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewRol(Number(e.target.value));
  };

  const handleSubmit = async () => {
    if (newEmail.trim() !== "") {
      const updateUser = {
        id: id,
        name: newName,
        lastName: newLastName,
        email: newEmail,
        password: newPassword,
        rolId: newRol,
      };

      await OnUpdateUser(id, updateUser);
      closeModal();
    }
  };

  return (
    <div className=" p-2  opacity-100">
      <button
        onClick={openModal}
        className="flex justify-center py-2 px-2 text-[#22CCEE]"
      >
        <FaRegEdit size={26}></FaRegEdit>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative">
            <h3 className="text-lg font-medium mb-4 text-center">
              Modificar Usuario
            </h3>
            <form>
              <div className="modal container bg-white grid grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-medium"
                  >
                    Nombres:
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="newName"
                    onChange={handleInputChange}
                    className="w-full h-10 p-4 border rounded-xl"
                    placeholder="Nombres del usuario"
                  />
                </div>

                <div className="ml-5">
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 text-sm font-medium"
                  >
                    Apellidos:
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="newLastName"
                    onChange={handleInputChange}
                    className="w-full h-10 p-4 border rounded-xl"
                    placeholder="Apellidos del usuario"
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-medium"
                  >
                    Correo Electrónico:
                  </label>
                  <input
                    id="email"
                    type="text"
                    name="newEmail"
                    onChange={handleInputChange}
                    className="w-full h-10 p-4 border rounded-xl"
                    placeholder="Email del usuario"
                  />
                </div>

                <div className="ml-5 mt-5">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-medium"
                  >
                    Contraseña:
                  </label>
                  <input
                    id="password"
                    type="text"
                    name="newPassword"
                    onChange={handleInputChange}
                    className="w-full h-10 p-4 border rounded-xl"
                    placeholder="Password del usuario"
                  />
                </div>

                <div className="mt-3">
                  <label htmlFor="rolId" className="block font-semibold mb-2">
                    Selecciona un Rol:
                  </label>
                  <select
                    id="rolId"
                    name="rolId"
                    onChange={(e) => handleSelectChange(e)}
                    value={newRol}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                  >
                    <option value="" disabled>
                      Selecciona un rol
                    </option>
                    {roles.map((rol) => (
                      <option key={rol.id} value={rol.id}>
                        {rol.rol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
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

export default UpdateUser;
