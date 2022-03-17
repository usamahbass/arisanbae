import { createContext, Dispatch, useReducer, FC, useEffect } from "react";
import { initialState, reducer, initialStateType } from "./reducer";

export const ArisanContext = createContext<{
  state: initialStateType;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const Store: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("arisan", JSON.stringify(state));
  }, [state]);

  return (
    <ArisanContext.Provider value={{ state, dispatch }}>
      {children}
    </ArisanContext.Provider>
  );
};
