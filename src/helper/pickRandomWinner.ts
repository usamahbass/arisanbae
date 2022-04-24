import type { ArisanMemberTypes } from "types/core/member";

export const pickRandomWinner = (
  arr: Array<ArisanMemberTypes> | any,
  winnerCount: number
) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, winnerCount);
};
