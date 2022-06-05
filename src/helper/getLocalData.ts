import type { initialStateType } from "context/reducer";

export const getLocalData = () => {
  const localData = localStorage.getItem("arisan");
  const isLocalData: initialStateType = JSON.parse(localData || "");

  return isLocalData;
};
