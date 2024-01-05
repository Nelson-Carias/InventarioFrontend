import { create } from "zustand";
import { IPagination } from "../types/global.types";
import { IRoleStore } from "../types/rol.store.types";
import {
  delete_roles,
  update_roles,
  get_roles,
  create_roles,
  get_roles_list
} from "../service/rol.service";
import { AxiosError } from "axios";
// import { ShowToast } from "../plugins/sweet-alert";
// import { ShowErrorAlert } from "../plugins/alerts/error-alerts";

export const useRoleStore = create<IRoleStore>((set, get) => ({
  roles: [],
  pagination_roles: {} as IPagination,
  OnGetRoles: async (page = 1, limit = 5, name = "") => {
    get_roles(page, limit, name)
      .then(({data}) => {
        set({
          roles: data.roles,
          pagination_roles: {
            total: data.total,
            totalPag: data.totalPag,
            currentPag: data.currentPag,
            nextPag: data.nextPag,
            prevPag: data.prevPag,
            // status: data.status,
            ok: data.ok,
          },
        });
      })
      .catch((error) => {
        // ShowErrorAlert(Number(error.response?.data.status));
        console.log(error)
        set({
          roles: [],
          pagination_roles: {
            total: 0,
            totalPag: 0,
            currentPag: 0,
            nextPag: 0,
            prevPag: 0,
            // status: 0,
            ok: false,
          },
        });
      });
  },

  OnCreateRol(rol) {
    const value = create_roles(rol)
      .then(({ data }) => {
        get().OnGetRoles(1, 5, "")
        console.log("success", "Registro creado con éxito");
        return data.ok;
      });
    return value;
  },

  OnDeleteRol(id: number) {
    const value = delete_roles(id)
    .then((response) => {
      get().OnGetRoles(1, 5, "");
      return response.ok;
    })
    .catch((error: AxiosError<{ status: number }>) => {
      Number(error.response?.data.status);
      return false
    })
    return value;
  },

  OnGetRolesList: async () => {
    get_roles_list().then(({ data }) => {
      set({
        roles: data.roles,
      });
    });
  },

  OnUpdateRol(id: number, rol) {
    const value = update_roles(id, rol)
      .then((response) => {
        console.log("success", "Rol fue actualizado correctamente");
        get().OnGetRoles(1, 5, "");
        return response.data.ok;
      })
      .catch((error: AxiosError<{ status: number }>) => {
        Number(error.response?.data.status);
        return false;
      });
    return value;
  },
}));