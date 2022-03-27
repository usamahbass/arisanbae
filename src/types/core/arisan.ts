import type { AdministratorTypes } from "./administrator";
import type { ArisanMemberTypes } from "./member";

export type ArisanTypes = {
  name: string;
  dues: number;
  winners_count: number;
  member_count: number | any;
  payment_term: {
    type: string;
    content: number;
  };
  administrator: AdministratorTypes;
  members: Array<ArisanMemberTypes>;
};
