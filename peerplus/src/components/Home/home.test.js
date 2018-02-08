/**
 * @jest-environment node
 */

import { calculatePercentageComplete } from "./Polls.js";

test("calculates percentage of people who completed a poll", () => {
  let participants = 10;
  let completedBy = 1;
  expect(calculatePercentageComplete(participants, completedBy)).toBe(10);
});
