import i18next from 'i18next';

import ru from './i18n/ru';
import Planner from './Planner';

i18next.addResourceBundle('ru', 'examplePage', ru);

const PlannerConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'planner',
      element: <Planner />,
    },
  ],
};

export default PlannerConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'example',
      element: <Example />,
    },
  ],
};

export default ExampleConfig;
*/
