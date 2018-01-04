import { configure } from '@storybook/react'
import '../src/style.css'

function loadStories () {
  require('../src/stories')
}

configure(loadStories, module)
