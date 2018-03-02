import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { user, polls } from './mockData';
import { Slider } from '../components/CreatePoll/Create';
import { Poll } from '../components/Landing.jsx';
import PollBox from '../components/Navigation/PollBox.jsx';
import { BrowserRouter } from 'react-router-dom';
import 'tachyons';
import 'normalize.css';
import '../style.css';
import '../grid.css';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Buttons', module)
  .add('primary button', () => (
    <div className="w5 center mv5">
      <button className="grow">Primary</button>
    </div>
  ))
  .add('secondary button', () => (
    <div className="w5 center mv5">
      <button className="seethrough dim">Secondary</button>
    </div>
  ))
  .add('duration slider', () => (
    <div className="w5 center mv5">
      <Slider duration={24} handleChange={action('slider')} />
    </div>
  ));

storiesOf('Notifications', module).add('default', () => (
  <BrowserRouter>
    <PollBox polls={polls} close={() => action('closed')} user={user} />
  </BrowserRouter>
));

storiesOf('Pre-filled Poll Banners', module).add('default', () => (
  <BrowserRouter>
    <Poll title="An example title." index={1} id={1} />
  </BrowserRouter>
));
