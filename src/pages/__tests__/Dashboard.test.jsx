import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { internet } from 'faker';
import { AddPeople } from '../Dashboard';

test('add people list pre-poulates list if team exists', () => {
  const fakeProps = {
    people: [internet.email()],
    setPeople: jest.fn(),
  };

  const { getByPlaceholderText, getByText } = render(
    <AddPeople {...fakeProps} />
  );
  getByText(fakeProps.people[0]);

  const emailInput = getByPlaceholderText(/add email address/i);
  userEvent.type(emailInput, internet.email());
  fireEvent.click(getByText(/add people/i));
  expect(fakeProps.setPeople).toHaveBeenCalled();
  // expect(setPeople).toHaveBeenCalledWith(55);
});
