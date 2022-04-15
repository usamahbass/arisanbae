import type { AdministratorTypes } from "types/core/administrator";
import type { ArisanTypes } from "types/core/arisan";
import type { ArisanMemberTypes } from "types/core/member";
import { ArisanSchedule } from "types/core/schedule";
import { TypesReducer } from "./type";

export const setArisanName = (arisanName: string) => ({
  type: TypesReducer.SET_ARISAN_NAME,
  payload: arisanName,
});

export const setAdministratorData = (adminData: AdministratorTypes) => ({
  type: TypesReducer.SET_ADMINISTRATOR_DATA,
  payload: adminData,
});

export const changeLanguage = (language: string) => ({
  type: TypesReducer.CHANGE_LANGUAGE,
  payload: language,
});

export const changeCurrentRoutes = (currentRoutes: string | any) => ({
  type: TypesReducer.CHANGE_CURRENT_ROUTES,
  payload: currentRoutes,
});

export const changePreviousRoutes = (previousRoutes: string | any) => ({
  type: TypesReducer.CHANGE_PREVIOUS_ROUTES,
  payload: previousRoutes,
});

export const changeNextRoutes = (nextRoutes: string | any) => ({
  type: TypesReducer.CHANGE_PREVIOUS_ROUTES,
  payload: nextRoutes,
});

export const setArisanData = (arisanData: ArisanTypes | any) => ({
  type: TypesReducer.SET_ARISAN_DATA,
  payload: arisanData,
});

export const setArisanMembers = (arisanMember: ArisanMemberTypes) => ({
  type: TypesReducer.SET_ARISAN_MEMBERS,
  payload: arisanMember,
});

export const setAuthentication = (auth: boolean) => ({
  type: TypesReducer.SET_AUTHENTICATION,
  payload: auth,
});

export const setArisanSchedule = (arisanSchedule: any) => ({
  type: TypesReducer.SET_ARISAN_SCHEDULE,
  payload: arisanSchedule,
});

export const removeArisanData = () => ({
  type: TypesReducer.REMOVE_ARISAN_DATA,
});

export const setArisanKe = (arisanKe: number) => ({
  type: TypesReducer.SET_ARISAN_KE,
  payload: arisanKe,
});

export const setAlreadyPaid = (newSchedule: ArisanSchedule[]) => ({
  type: TypesReducer.SET_ALREADY_PAID,
  payload: newSchedule,
});
