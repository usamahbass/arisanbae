import type { ArisanMemberTypes } from "types/core/member";

export const createArisanKeByCount = (
  count: number,
  members: ArisanMemberTypes[]
) => {
  // initialize state
  let results = {};
  const filterMembers = members.filter((member) => !member.winner);
  const isMembers = filterMembers.map((member) => ({
    ...member,
    paid: false,
  }));

  Array.from(new Array(count)).map((el, i) => {
    const id = i + 1;

    results = {
      ...results,
      [id]: isMembers,
    };
  });

  return results;
};
