import { Reducer } from "react";
import type { ArisanTypes } from "types/core/arisan";
import { TypesReducer } from "./type";

export type initialStateType = {
  arisan: ArisanTypes | null;
  language: string;
  currentRoutes: null | string;
  previousRoutes: null | string;
  nextRoutes: null | string;
};

export const initialState = {
  arisan: null,
  language: "ID",
  currentRoutes: null,
  previousRoutes: null,
  nextRoutes: null,
};

type ReducerActionType = { type: string; payload: {} | string };

export const reducer: Reducer<initialStateType | any, ReducerActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case TypesReducer.SET_ADMINISTRATOR_DATA:
      return {
        ...state,
        arisan: { ...state.arisan, administrator: action.payload },
      };
    case TypesReducer.CHANGE_LANGUAGE:
      return { ...state, language: action.payload };
    case TypesReducer.CHANGE_CURRENT_ROUTES:
      return { ...state, currentRoutes: action.payload };
    case TypesReducer.CHANGE_PREVIOUS_ROUTES:
      return { ...state, previousRoutes: action.payload };
    case TypesReducer.CHANGE_NEXT_ROUTES:
      return { ...state, nextRoutes: action.payload };
    default:
      return state;
  }
};
