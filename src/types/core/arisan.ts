import type { AdministratorTypes } from "./administrator";
import type { ArisanMemberTypes } from "./member";
import type { ArisanSchedule } from "./schedule";

export type ArisanTypes = {
  name: string;
  dues: number;
  winners_count: number;
  arisan_ke: number;
  member_count: number | any;
  payment_term: {
    type: string | any;
    content: string | any;
  };
  schedule: ArisanSchedule;
  administrator: AdministratorTypes;
  members: Array<ArisanMemberTypes>;
  arisanKeHasBeenVote: number[];
};
