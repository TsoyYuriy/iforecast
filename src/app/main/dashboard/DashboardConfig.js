import i18next from 'i18next';

import ru from './i18n/ru';
import DashboardClean from "./DashboardClean";

i18next.addResourceBundle('ru', 'examplePage', ru);

const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'dashboard',
      element: <DashboardClean/>
    },
  ],
};

export default DashboardConfig;
