import { shape, string, number, arrayOf, instanceOf } from 'prop-types';

export const objectiveType = shape({
  lead: arrayOf(
    shape({
      uid: string.isRequired,
      photo: string.isRequired,
    })
  ),
  title: string.isRequired,
  count: number.isRequired,
  updates: arrayOf(
    shape({
      uid: string.isRequired,
      photo: string.isRequired,
      date: instanceOf(Date),
      update: string.isRequired,
    })
  ),
  id: string.isRequired,
  deadline: instanceOf(Date),
}).isRequired;

//  const initialState = {
//     group: 'primary',
//     title: '',
//     lead: {
//       uid: user.uid,
//       photo: user.photoURL,
//     },
//     type: 'metric',
//     deadline: new Date(),
//     createdOn: new Date(),
//     completedOn: new Date(),
//     description: '',
//     complete: false,
//     count: 0,
//     countHistory: [{ count: 0, date: new Date() }],
//     updates: [{
//       uid: user.uid,
//       photo: user.photoURL,
//       date: new Date(),
//       update: 'Objective created.'
//     }]
//   }
