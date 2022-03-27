import { useContext } from "react";
import { ArisanContext } from "context/context";
import { ROUTES_NAME } from "constants/routes";
import WelcomePages from "./welcome";
import CreateProfile from "./manual/create-profile";
import CreatePinPages from "./manual/create-pin";
import EntryMemberPages from "./manual/entry-member";
import GiftResult from "./manual/gift-result";

const WelcomeSwitch = () => {
  const { state } = useContext(ArisanContext);

  switch (state?.currentRoutes) {
    case ROUTES_NAME.WELCOME:
      return <WelcomePages />;
    case ROUTES_NAME.CREATE_PROFILE_ADMIN:
      return <CreateProfile />;
    case ROUTES_NAME.ENTRY_MEMBER:
      return <EntryMemberPages />;
    case ROUTES_NAME.GIFT_RESULT:
      return <GiftResult />;
    case ROUTES_NAME.CREATE_PIN_ADMIN:
      return <CreatePinPages />;
    default:
      return <WelcomePages />;
  }
};

export default WelcomeSwitch;
