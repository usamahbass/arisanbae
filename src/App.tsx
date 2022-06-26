import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ArisanContext } from "context/context";
import AuthenticatedPages from "views/authenticated";
import WelcomePages from "views/welcome";

const App = () => {
  const { state } = useContext(ArisanContext);

  if (state?.auth) {
    return <AuthenticatedPages />;
  }

  return <WelcomePages />;
};

export default App;
