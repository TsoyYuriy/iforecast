import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  // {
  //   id: 'example-component',
  //   title: 'Example', заголовок для меню
  //   translate: 'EXAMPLE',
  //   type: 'item',
  //   icon: 'heroicons-outline:star',
  //   url: 'example',
  // },
  {
    id: 'dashboard',
    translate: 'DASHBOARD',
    type: 'item',
    icon: 'material-solid:speed',
    url: 'dashboard',
  },
  {
    id: 'planner',
    translate: 'PLANNER',
    type: 'item',
    icon: 'heroicons-outline:calendar',
    url: 'planner',
  },
];

export default navigationConfig;
