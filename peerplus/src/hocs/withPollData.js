import { lifecycle } from 'recompose'
import { db } from '../constants/firebase'

export const withPollData = lifecycle({
  componentDidMount () {
    db
      .collection(`polls`)
      .get()
      .then(coll => {
        const polls = coll.docs.map(doc => doc.data())
        this.setState({ polls })
      })
  }
})
