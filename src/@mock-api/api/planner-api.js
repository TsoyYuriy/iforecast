import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import mockApi from '../mock-api.json';
import mock from '../mock';

let notificationsDB = mockApi.components.examples.data.value;

mock.onGet('/scheduler').reply((config) => {
  return [200, notificationsDB];
});

mock.onPost('/scheduler').reply(({ data }) => {
  const newNotification = { id: FuseUtils.generateGUID(), ...JSON.parse(data) };
  notificationsDB.push(newNotification);

  return [200, newNotification];
});

mock.onDelete(/\/scheduler\/[^/]+/).reply((config) => {
  const { id } = config.url.match(/\/scheduler\/(?<id>[^/]+)/).groups;

  _.remove(notificationsDB, { id });

  return [200, id];
});
