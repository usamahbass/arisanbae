import type { AdministratorTypes } from "types/core/administrator";
import { TypesReducer } from "./type";

export const setAdministratorData = (adminData: AdministratorTypes) => ({
  type: TypesReducer.SET_ADMINISTRATOR_DATA,
  payload: adminData,
});
