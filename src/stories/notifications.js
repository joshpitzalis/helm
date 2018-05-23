import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PollBox from '../components/Navigation/PollBox.jsx';
import { user, polls, onePoll } from './mockData';
import { BrowserRouter } from 'react-router-dom';

const stories = storiesOf('Notifications Bar', module);

stories.add('Without notifications', () => (
  <BrowserRouter>
    <PollBox polls={[]} close={() => action('closed')} user={user} />
  </BrowserRouter>
));

stories.add('With many notifications', () => (
  <BrowserRouter>
    <PollBox polls={polls} close={() => action('closed')} user={user} />
  </BrowserRouter>
));
