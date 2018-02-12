/**
 * @jest-environment node
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';

import { calculatePercentageComplete } from './Polls.js';

test('calculates percentage of people who completed a poll', () => {
  const participants = 10;
  const completedBy = 1;
  expect(calculatePercentageComplete(participants, completedBy)).toBe(10);
});
