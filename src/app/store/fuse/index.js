import { combineReducers } from '@reduxjs/toolkit';
import dialog from './dialogSlice';
import message from './messageSlice';
import navbar from './navbarSlice';
import navigation from './navigationSlice';
import settings from './settingsSlice';
import planner from '../../main/planner/store/plannerSlice';
import dashboard from '../../main/dashboard/store/dashboardSlice';

const fuseReducers = combineReducers({
  navigation,
  settings,
  navbar,
  message,
  dialog,
  planner,
  dashboard
});

export default fuseReducers;
