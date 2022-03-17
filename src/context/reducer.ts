import { Reducer } from "react";
import type { ArisanTypes } from "types/core/arisan";
import { TypesReducer } from "./type";

export type initialStateType = {
  arisan: ArisanTypes | null;
};

export const initialState = {
  arisan: null,
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
    default:
      return state;
  }
};
