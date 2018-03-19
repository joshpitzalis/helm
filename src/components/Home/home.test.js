/**
 * @jest-environment node
 */

import { calculatePercentageComplete } from './Polls.js';

test('calculates percentage of people who completed a poll', () => {
  const participants = 10;
  const completedBy = 1;
  expect(calculatePercentageComplete(participants, completedBy)).toBe(10);
});
