import React from 'react'
import {
  compose,
  branch,
  renderComponent,
  renderNothing,
  setDisplayName,
  setPropTypes
} from 'recompose'
import PropTypes from 'prop-types'

const onlyShowBackButtonIfOnStepTwo = branch(
  ({ step }) => step !== 2,
  renderNothing
)

const BackButton = onlyShowBackButtonIfOnStepTwo(({ goToPrev }) => (
  <button onClick={goToPrev} type="submit" className="seethrough">
    Back
  </button>
))

const onlyShowSubmitButtonIfOnStepTwo = branch(
  ({ step }) => step !== 2,
  renderNothing
)

const SubmitButton = onlyShowSubmitButtonIfOnStepTwo(({ handleSubmitForm }) => (
  <button
    onClick={handleSubmitForm}
    type="submit"
    data-colour="green"
    data-test="submitPoll"
    className=" grow">
    Submit
  </button>
))

const onlyShowNextButtonOnStepOne = branch(
  ({ step }) => step !== 1,
  renderNothing
)

const NextButton = onlyShowNextButtonOnStepOne(
  ({ pollId, goToNext, handleCreateForm, step }) => (
    <button
      onClick={pollId ? goToNext : handleCreateForm}
      type="submit"
      data-colour="green"
      data-test="submit"
      className=" grow">
      Next
    </button>
  )
)

const ProceedButtons = ({
  step,
  goToPrev,
  handleSubmitForm,
  pollId,
  goToNext,
  handleCreateForm
}) => (
  <div className="tc w-100">
    <NextButton
      pollId={pollId}
      goToNext={goToNext}
      handleCreateForm={handleCreateForm}
      step={step}
    />
    <BackButton goToPrev={goToPrev} step={step} />
    <SubmitButton handleSubmitForm={handleSubmitForm} step={step} />
  </div>
)

export default compose(
  setDisplayName('ProceedButtons'),
  setPropTypes({
    step: PropTypes.number.isRequired,
    pollId: PropTypes.string.isRequired,
    goToPrev: PropTypes.func.isRequired,
    goToNext: PropTypes.func.isRequired,
    handleSubmitForm: PropTypes.func.isRequired,
    handleCreateForm: PropTypes.func.isRequired
  })
)(ProceedButtons)
