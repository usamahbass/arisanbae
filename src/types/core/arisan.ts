import type { ArisanMemberTypes } from "./member";

export type ArisanTypes = {
  dues: number;
  winners: number;
  member_count: number;
  payment_term: {
    type: string;
    content: number;
  };
  administrator: {
    username: string;
    password: string;
  };
  members: Array<ArisanMemberTypes>;
};
