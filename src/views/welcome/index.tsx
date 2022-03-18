import { useContext } from "react";
import { ArisanContext } from "context/context";
import { ROUTES_NAME } from "constants/routes";
import WelcomePages from "./welcome";
import CreateProfile from "./manual/create-profile";

const WelcomeSwitch = () => {
  const { state } = useContext(ArisanContext);

  switch (state?.currentRoutes) {
    case ROUTES_NAME.WELCOME:
      return <WelcomePages />;
    case ROUTES_NAME.CREATE_PROFILE_ADMIN:
      return <CreateProfile />;
    default:
      return <WelcomePages />;
  }
};

export default WelcomeSwitch;
