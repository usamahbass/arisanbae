import { Reducer } from "react";
import { TypesReducer } from "./type";
import type { ArisanTypes } from "types/core/arisan";

export type initialStateType = {
  auth: boolean;
  arisan: ArisanTypes & any;
  language: string;
  currentRoutes: null | string;
  previousRoutes: null | string;
  nextRoutes: null | string;
};

export const initialState = {
  auth: false,
  arisan: null,
  language: "ID",
  currentRoutes: null,
  previousRoutes: null,
  nextRoutes: null,
};

type ReducerActionType = { type: string; payload: {} | any };

export const reducer: Reducer<initialStateType | any, ReducerActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case TypesReducer.SET_ARISAN_NAME:
      return { ...state, arisan: { ...state.arisan, name: action.payload } };
    case TypesReducer.SET_ADMINISTRATOR_DATA:
      return {
        ...state,
        arisan: {
          ...state.arisan,
          administrator: { ...state.arisan.administrator, ...action.payload },
        },
      };
    case TypesReducer.CHANGE_LANGUAGE:
      return { ...state, language: action.payload };
    case TypesReducer.CHANGE_CURRENT_ROUTES:
      return { ...state, currentRoutes: action.payload };
    case TypesReducer.CHANGE_PREVIOUS_ROUTES:
      return { ...state, previousRoutes: action.payload };
    case TypesReducer.CHANGE_NEXT_ROUTES:
      return { ...state, nextRoutes: action.payload };
    case TypesReducer.SET_ARISAN_DATA:
      return { ...state, arisan: { ...state.arisan, ...action.payload } };
    case TypesReducer.SET_ARISAN_MEMBERS:
      return { ...state, arisan: { ...state.arisan, members: action.payload } };
    case TypesReducer.SET_AUTHENTICATION:
      return { ...state, auth: action.payload };
    case TypesReducer.SET_ARISAN_SCHEDULE:
      return {
        ...state,
        arisan: { ...state.arisan, schedule: action.payload },
      };
    case TypesReducer.REMOVE_ARISAN_DATA:
      return { ...state, arisan: null };
    case TypesReducer.SET_ARISAN_KE:
      return {
        ...state,
        arisan: { ...state.arisan, arisan_ke: action.payload },
      };
    case TypesReducer.SET_ALREADY_PAID:
      return {
        ...state,
        arisan: {
          ...state.arisan,
          schedule: {
            ...state.arisan.schedule,
            [state.arisan.arisan_ke ?? 1]: action.payload,
          },
        },
      };
    case TypesReducer.SET_ARISAN_KE_HAS_BEEN_VOTE:
      return {
        ...state,
        arisan: {
          ...state.arisan,
          arisanKeHasBeenVote: [
            ...(state.arisan.arisanKeHasBeenVote ?? ""),
            action.payload,
          ],
        },
      };
    case TypesReducer.SET_ARISAN_HISTORY:
      return {
        ...state,
        arisan: {
          ...state.arisan,
          history: [...(state.arisan.history ?? ""), action.payload],
        },
      };
    case TypesReducer.SET_LISTS_ARISAN_HISTORY:
      return { ...state, arisan: { ...state.arisan, history: action.payload } };
    case TypesReducer.SET_APP_DATA:
      return action.payload;
    default:
      return state;
  }
};
