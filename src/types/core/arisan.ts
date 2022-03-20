import type { AdministratorTypes } from "./administrator";
import type { ArisanMemberTypes } from "./member";

export type ArisanTypes = {
  name: string;
  dues: number;
  winners: number;
  member_count: number;
  payment_term: {
    type: string;
    content: number;
  };
  administrator: AdministratorTypes;
  members: Array<ArisanMemberTypes>;
};
